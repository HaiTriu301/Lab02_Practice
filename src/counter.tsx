/** @jsx createElement */
import { createElement, useState, VNode } from "./jsx-runtime";

// Interface for Button
interface ButtonProps {
    onClick: () => void ;
    className?: string;
    children: VNode | string | number | (VNode | string | number)[];
}

// Component Button
const Button = ({onClick, className, children}: ButtonProps) => {
    return <button className={className} onClick={onClick}>{children}</button>;
};

// Interface for Counter
interface CounterProps {
    initialCount?: number;
}

// Component Counter
const Counter = ({ initialCount = 0 }: CounterProps) => {
    const [getCount, setCount] = useState(initialCount);

    const increment = () => setCount(getCount() + 1);
    const decrement = () => setCount(getCount() - 1);
    const reset = () => setCount(initialCount);

    return (
        <div className="counter" style={{ textAlign: "center", marginTop: "40px" }}>
            <h2>Count: {getCount()}</h2>
            <div className="buttons">
                <button onClick={increment} className="btn">+</button>
                <button onClick={decrement} className="btn">-</button>
                <button onClick={reset} className="btn">Reset</button>
            </div>
        </div>
    );
};

export{Counter};