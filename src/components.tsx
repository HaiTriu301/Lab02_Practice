/** @jsx createElement */
import { createElement, useState } from "./jsx-runtime";

// Card Component
interface CardProps {
    title?: string;
    className?: string;
    onClick?: () => void;
    children?: (string | number | any)[];
}

const Card = ({ title, className = "", onClick, children }: CardProps) => {
    return (
        <div
            className={`card ${className}`}
            style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "16px",
                margin: "10px auto",
                maxWidth: "400px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
            onClick={onClick}
        >
            {title && <h3 style={{ marginBottom: "10px" }}>{title}</h3>}
            <div>{children}</div>
        </div>
    );
};

// Modal Component
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children?: (string | number | any)[];
}

const Modal = (props: ModalProps) => {
    const { isOpen, onClose, title, children } = props;

    // STEP 1: Return empty fragment if not open (instead of null)
    if (!isOpen) {
        return createElement('fragment', null);
    }

    // STEP 2: Create overlay and modal content
    const handleOverlayClick = (e: any) => {
        // STEP 3: Handle click outside to close
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            onClick={handleOverlayClick}
            style={{
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
            }}
        >
            <div
                style={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    padding: '24px',
                    minWidth: '300px',
                    maxWidth: '500px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
            >
                {title && (
                    <h2 style={{
                        marginTop: '0',
                        marginBottom: '16px',
                        fontSize: '20px'
                    }}>
                        {title}
                    </h2>
                )}
                <div style={{ marginBottom: '16px' }}>
                    {children}
                </div>
                <button
                    onClick={onClose}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: '#f0f0f0',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

// Form Component
interface FormProps {
    onSubmit: (e: Event) => void;
    children?: any;
    className?: string;
}

const Form = (props: FormProps) => {
    const { onSubmit, children, className } = props;

    // Handle form submission and prevent default
    const handleSubmit = (e: Event) => {
        e.preventDefault();
        onSubmit(e);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={className || ''}
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
            }}
        >
            {children}
        </form>
    );
};

// Input Component
interface InputProps {
    type?: string;
    value?: string;
    onChange?: (e: any) => void;
    placeholder?: string;
    className?: string;
}

const Input = (props: InputProps) => {
    const { type = 'text', value, onChange, placeholder, className } = props;

    // Create a styled input with proper event handling
    const handleChange = (e: any) => {
        if (onChange) {
            onChange(e);
        }
    };

    return (
        <input
            type={type}
            value={value}
            onInput={handleChange}
            placeholder={placeholder}
            className={className || ''}
            style={{
                padding: '8px 12px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px',
                outline: 'none'
            }}
        />
    );
};

export { Card, Modal, Form, Input };