// Define the VNode interface
export interface VNode {
    type: string | ComponentFunction;
    props: Record<string, any>;
    children: (VNode | string | number)[];
}

// Interface for props of components
export interface ComponentProps {
    children?: (VNode | string | number)[];
    [ key: string ]: any;
}

// Type of function component
export type ComponentFunction = (props: ComponentProps) => VNode;

// Function createElement
export function createElement(
    type: string | ComponentFunction,
    props: Record<string, any> | null,
    ...children: (VNode | string | number)[]
): VNode {
    const normalizedProps = props || {};

    const flatChildren = children.flat().filter(
        (child) => child !== null && child !== undefined
    );

    if (typeof type === 'function') {
        return type({
            ...normalizedProps,
            children: flatChildren
        });
    }
    return{
        type,
        props: normalizedProps,
        children: flatChildren
    };
}

export function createFragment(
    props: Record<string, any> | null,
    ...children: (VNode | string | number)[]
): VNode {
    return createElement('Fragment', props, ...children);
}

// Function renderToDom
export function renderToDom(vnode : VNode | string | number) :Node {
    stateIndex = 0;

    // Step 1: If it is text (string or number)
    if (typeof vnode === 'string' || typeof vnode === 'number') {
        return document.createTextNode(String(vnode));
    }

    // Step 2: If it is fragment (type === 'fragment')
    if (vnode.type === 'fragment') {
        const fragment = document.createDocumentFragment();
        vnode.children.forEach(child => fragment.appendChild(renderToDom(child)));
        return fragment;
    }

    // Step 3: If it is a component function
    if (typeof vnode.type === 'function') {
        const component = vnode.type({...vnode.props, children: vnode.children});
        return renderToDom(component);
    }

    // Step 4: If it is a normal HTML
    const element = document.createElement(vnode.type as string);

    // Feature 1: Refs support
    if (vnode.props?.ref && typeof vnode.props.ref === 'function') {
        vnode.props.ref(element);
    }

    for (const [key, value] of Object.entries(vnode.props || {})) {
        if (key === "className"){
            element.setAttribute("class", value);
        }

        // Feature 2: CSS in JS support
        else if (key === "style"){
            if (typeof value === "string"){
                element.setAttribute("style", value);
            }
            else if (typeof value === "object"){
                for (const [prop, styleValue] of Object.entries(value)){
                    (element as HTMLElement).style[prop as any] = styleValue as string;
                }
            }
        }

        // Feature 3: Event delegation
        else if (key.startsWith("on") && typeof value === "function") {
            // Catch event like onClick, onMouseDown, etc.
            const eventName = key.slice(2).toLowerCase();
            element.addEventListener(eventName, value);
            // const handlerId = `${eventName}-${Math.random().toString(36).slice(2)}`;
            //
            // element.setAttribute(`data-event`, handlerId);
            //
            // // Save handler in global map to document can call
            // (window as any)._evenHandlers = (window as any)._evenHandlers || {};
            // (window as any)._evenHandlers[handlerId] = value;
            //
            // if (!(window as any)._delegated_){
            //     document.body.addEventListener(eventName, (e) => {
            //         const target = e.target as HTMLElement;
            //         const attr = target?.getAttribute?.("data-event");
            //         if (attr && (window as any)._evenHandlers[attr]){
            //             (window as any)._evenHandlers[attr](e);
            //         }
            //     }, true);
            //     (window as any)._delegated_ = true;
            // }
        }
        else if (key !== "children" && key !== "ref"){
            element.setAttribute(key, value);
        }
    }

    // Add children
    vnode.children.forEach(child => element.appendChild(renderToDom(child)));
    return element;
}

function updateDom(
    parent: HTMLElement,
    oldVNode: VNode | string | number,
    newVNode: VNode | string | number,
    index = 0
) {
    const oldNode = parent.childNodes[index];

    // If both are text node
    if (typeof oldVNode === "string" || typeof oldVNode === "number") {
        if (typeof newVNode === "string" || typeof newVNode === "number") {
            if (oldVNode !== newVNode) {
                oldNode.textContent = String(newVNode);
            }
            return;
        } else {
            const newDom = renderToDom(newVNode);
            parent.replaceChild(newDom, oldNode);
            return;
        }
    }

    // If different types, replace
    if ((oldVNode as VNode).type !== (newVNode as VNode).type) {
        const newDom = renderToDom(newVNode);
        parent.replaceChild(newDom, oldNode);
        return;
    }

    // Update props
    const element = oldNode as HTMLElement;
    const oldProps = (oldVNode as VNode).props || {};
    const newProps = (newVNode as VNode).props || {};

    // Update or add new props
    for (const [key, value] of Object.entries(newProps)) {
        if (key.startsWith("on")) continue; // skip events
        if (oldProps[key] !== value) {
            if (key === "className") element.setAttribute("class", value);
            else if (key === "style" && typeof value === "object") {
                for (const [prop, styleValue] of Object.entries(value)) {
                    (element as HTMLElement).style[prop as any] = styleValue as string;
                }
            } else element.setAttribute(key, value);
        }
    }

    // Remove old props not in new
    for (const key of Object.keys(oldProps)) {
        if (!(key in newProps)) element.removeAttribute(key);
    }

    // Update children
    const oldChildren = (oldVNode as VNode).children;
    const newChildren = (newVNode as VNode).children;
    const maxLen = Math.max(oldChildren.length, newChildren.length);

    for (let i = 0; i < maxLen; i++) {
        if (i >= oldChildren.length) {
            // thêm mới
            element.appendChild(renderToDom(newChildren[i]));
        } else if (i >= newChildren.length) {
            // xoá
            element.removeChild(element.childNodes[i]);
        } else {
            updateDom(element, oldChildren[i], newChildren[i], i);
        }
    }
}

// Function mount
let rootVNode: VNode | null = null;
let rootComponent: (() => VNode) | null = null;
let rootContainer: HTMLElement | null = null;

export function mount(vnodeOrComponent: any, container: HTMLElement): void {
    rootContainer = container;
    if (typeof vnodeOrComponent === "function") {
        // Save the root component
        rootComponent = vnodeOrComponent;
        rootVNode = rootComponent!();
        container.innerHTML = "";
        container.appendChild(renderToDom(rootVNode));
    } else {
        rootContainer = container;
        container.innerHTML = "";
        container.appendChild(renderToDom(vnodeOrComponent));
    }
}



// Basic useState with re-render
let states: any[] = [];
let stateIndex = 0;

export function useState<T>(initialValue: T): [() => T, (newValue: T) => void]{
    const currentIndex = stateIndex;
    states[currentIndex] = states[currentIndex] ?? initialValue;

    const get = () => states[currentIndex];
    const set = (newValue: T) => {
        states[currentIndex] = newValue;
        stateIndex = 0;
        reRender();
    };

    stateIndex++;
    return [get, set];
}

function reRender() {
    // if (rootComponent && rootContainer) {
    //     stateIndex = 0;
    //     const newVNode = rootComponent();
    //     const activeElement = document.activeElement as HTMLInputElement;
    //     const isInput = activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA');
    //     const cursorStart = isInput ? activeElement.selectionStart : null;
    //     const cursorEnd = isInput ? activeElement.selectionEnd : null;
    //     const activeValue = isInput ? activeElement.value : null;
    //
    //     const newDom = renderToDom(newVNode);
    //     if (rootContainer.firstChild) {
    //         rootContainer.replaceChild(newDom, rootContainer.firstChild);
    //     } else {
    //         rootContainer.appendChild(newDom);
    //     }
    //     rootVNode = newVNode;
    //
    //     if (isInput && cursorStart !== null) {
    //         const inputs = rootContainer.querySelectorAll('input, textarea');
    //         for (let i = 0; i < inputs.length; i++) {
    //             const input = inputs[i] as HTMLInputElement;
    //             if (input.value === activeValue) {
    //                 input.focus();
    //                 input.setSelectionRange(cursorStart, cursorEnd);
    //                 break;
    //             }
    //         }
    //     }
    //
    //     console.log("UI re-rendered");
    // }
    function reRender() {
        if (rootComponent && rootContainer) {
            const newVNode = rootComponent();
            updateDom(rootContainer, rootVNode!, newVNode);
            rootVNode = newVNode;
            console.log("UI diffed & updated efficiently");
        }
    }

}

// Giúp TypeScript hiểu các thẻ JSX như <div>, <span>, <button>... là hợp lệ
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [elemName: string]: any;
        }
    }
}