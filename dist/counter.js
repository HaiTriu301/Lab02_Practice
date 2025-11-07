"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Counter = void 0;
/** @jsx createElement */
const jsx_runtime_1 = require("./jsx-runtime");
// Component Button
const Button = ({ onClick, className, children }) => {
    return (0, jsx_runtime_1.createElement)("button", { className: className, onClick: onClick }, children);
};
// Component Counter
const Counter = ({ initialCount = 0 }) => {
    const [getCount, setCount] = (0, jsx_runtime_1.useState)(initialCount);
    const increment = () => setCount(getCount() + 1);
    const decrement = () => setCount(getCount() - 1);
    const reset = () => setCount(initialCount);
    return ((0, jsx_runtime_1.createElement)("div", { className: "counter", style: { textAlign: "center", marginTop: "40px" } },
        (0, jsx_runtime_1.createElement)("h2", null,
            "Count: ",
            getCount()),
        (0, jsx_runtime_1.createElement)("div", { className: "buttons" },
            (0, jsx_runtime_1.createElement)("button", { onClick: increment, className: "btn" }, "+"),
            (0, jsx_runtime_1.createElement)("button", { onClick: decrement, className: "btn" }, "-"),
            (0, jsx_runtime_1.createElement)("button", { onClick: reset, className: "btn" }, "Reset"))));
};
exports.Counter = Counter;
