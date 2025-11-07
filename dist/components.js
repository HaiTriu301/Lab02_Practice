"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = exports.Form = exports.Modal = exports.Card = void 0;
/** @jsx createElement */
const jsx_runtime_1 = require("./jsx-runtime");
const Card = ({ title, className = "", onClick, children }) => {
    return ((0, jsx_runtime_1.createElement)("div", { className: `card ${className}`, style: {
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "16px",
            margin: "10px auto",
            maxWidth: "400px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }, onClick: onClick },
        title && (0, jsx_runtime_1.createElement)("h3", { style: { marginBottom: "10px" } }, title),
        (0, jsx_runtime_1.createElement)("div", null, children)));
};
exports.Card = Card;
const Modal = (props) => {
    const { isOpen, onClose, title, children } = props;
    // STEP 1: Return empty fragment if not open (instead of null)
    if (!isOpen) {
        return (0, jsx_runtime_1.createElement)('fragment', null);
    }
    // STEP 2: Create overlay and modal content
    const handleOverlayClick = (e) => {
        // STEP 3: Handle click outside to close
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    return ((0, jsx_runtime_1.createElement)("div", { onClick: handleOverlayClick, style: {
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '1000'
        } },
        (0, jsx_runtime_1.createElement)("div", { style: {
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '24px',
                minWidth: '300px',
                maxWidth: '500px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            } },
            title && ((0, jsx_runtime_1.createElement)("h2", { style: {
                    marginTop: '0',
                    marginBottom: '16px',
                    fontSize: '20px'
                } }, title)),
            (0, jsx_runtime_1.createElement)("div", { style: { marginBottom: '16px' } }, children),
            (0, jsx_runtime_1.createElement)("button", { onClick: onClose, style: {
                    padding: '8px 16px',
                    backgroundColor: '#f0f0f0',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    cursor: 'pointer'
                } }, "Close"))));
};
exports.Modal = Modal;
const Form = (props) => {
    const { onSubmit, children, className } = props;
    // Handle form submission and prevent default
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(e);
    };
    return ((0, jsx_runtime_1.createElement)("form", { onSubmit: handleSubmit, className: className || '', style: {
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
        } }, children));
};
exports.Form = Form;
const Input = (props) => {
    const { type = 'text', value, onChange, placeholder, className } = props;
    // Create a styled input with proper event handling
    const handleChange = (e) => {
        if (onChange) {
            onChange(e);
        }
    };
    return ((0, jsx_runtime_1.createElement)("input", { type: type, value: value, onInput: handleChange, placeholder: placeholder, className: className || '', style: {
            padding: '8px 12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px',
            outline: 'none'
        } }));
};
exports.Input = Input;
