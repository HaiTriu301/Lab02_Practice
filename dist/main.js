"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @jsx createElement */
const jsx_runtime_1 = require("./jsx-runtime");
const jsx_runtime_2 = require("./jsx-runtime");
const components_1 = require("./components");
const jsx_runtime_3 = require("./jsx-runtime");
// mount(() => <TodoApp/>, document.getElementById("root")!);
// @ts-ignore
// const app = (
// Exercise 1:
// <div className="hello" style={{color: "blue", fontSize: "20px"}}>
//     <h2>Hello JSX without React!</h2>
//     <button onClick={() => alert("Clicked!")}>Click me</button>
// </div>
// Exercise 2.1:
//     <div>
//         <h1 style={{textAlign: "center", color: "blue"}}>Simple Counter App</h1>
//         <Counter initialCount={0}/>
//     </div>
// Exercise 2.2, 3.1:
// <div>
//     <h1 style={{textAlign: "center", color: "green"}}>Todo List Application</h1>
//     <TodoApp/>
// </div>
// );
const ComponentLibraryDemo = () => {
    const [getShowModal, setShowModal] = (0, jsx_runtime_3.useState)(false);
    const [getFormData, setFormData] = (0, jsx_runtime_3.useState)('');
    const [getSubmittedData, setSubmittedData] = (0, jsx_runtime_3.useState)('');
    const handleFormSubmit = (e) => {
        setSubmittedData(getFormData());
        setFormData('');
    };
    const handleOpenModal = () => {
        console.log('Opening modal, current state:', getShowModal());
        setShowModal(true);
        console.log('After setState, state should be:', true);
    };
    const handleCloseModal = () => {
        console.log('Closing modal');
        setShowModal(false);
    };
    console.log('Rendering ComponentLibraryDemo, showModal =', getShowModal());
    return ((0, jsx_runtime_1.createElement)("div", null,
        (0, jsx_runtime_1.createElement)("h1", null, "Exercise 3.2: Component Library Demo"),
        (0, jsx_runtime_1.createElement)("h2", null, "1. Card Component"),
        (0, jsx_runtime_1.createElement)(components_1.Card, { title: "Card with title" },
            (0, jsx_runtime_1.createElement)("p", null, "This is card content")),
        (0, jsx_runtime_1.createElement)(components_1.Card, null,
            (0, jsx_runtime_1.createElement)("p", null, "Card without title")),
        (0, jsx_runtime_1.createElement)(components_1.Card, { title: "Clickable Card", onClick: () => alert('Card clicked!') },
            (0, jsx_runtime_1.createElement)("p", null, "Click this card")),
        (0, jsx_runtime_1.createElement)("h2", null, "2. Modal Component"),
        (0, jsx_runtime_1.createElement)("p", null,
            "Current modal state: ",
            getShowModal() ? 'OPEN' : 'CLOSED'),
        (0, jsx_runtime_1.createElement)("button", { onClick: handleOpenModal }, "Open Modal"),
        (0, jsx_runtime_1.createElement)(components_1.Modal, { isOpen: getShowModal(), onClose: handleCloseModal, title: "Test Modal" },
            (0, jsx_runtime_1.createElement)("p", null, "Modal content here"),
            (0, jsx_runtime_1.createElement)("p", null, "Click outside or Close button to close")),
        (0, jsx_runtime_1.createElement)("h2", null, "3. Form & Input Components"),
        (0, jsx_runtime_1.createElement)(components_1.Card, { title: "Form Test" },
            (0, jsx_runtime_1.createElement)(components_1.Form, { onSubmit: handleFormSubmit },
                (0, jsx_runtime_1.createElement)(components_1.Input, { value: getFormData(), onChange: (e) => setFormData(e.target.value), placeholder: "Type something" }),
                (0, jsx_runtime_1.createElement)("button", { type: "submit" }, "Submit")),
            getSubmittedData() && ((0, jsx_runtime_1.createElement)("p", null,
                "Submitted: ",
                getSubmittedData()))),
        (0, jsx_runtime_1.createElement)("h2", null, "4. Combined Test"),
        (0, jsx_runtime_1.createElement)(components_1.Card, { title: "All Together" },
            (0, jsx_runtime_1.createElement)(components_1.Input, { placeholder: "Input in card" }),
            (0, jsx_runtime_1.createElement)("button", { onClick: handleOpenModal }, "Open Modal"))));
};
const app = ((0, jsx_runtime_1.createElement)(ComponentLibraryDemo, null));
// mount(<TestDelegation /> as unknown as VNode, document.getElementById("root")!);
// mount(app as unknown as VNode, document.getElementById("root")!);
(0, jsx_runtime_2.mount)(app, document.getElementById("root"));
