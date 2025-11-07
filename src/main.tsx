/** @jsx createElement */
import {createElement, VNode} from "./jsx-runtime";
import { mount } from "./jsx-runtime";

import { Counter } from "./counter";
import { TodoApp } from "./todo-app";
import { Card, Modal, Form, Input } from "./components";
import { useState } from "./jsx-runtime";

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
    const [getShowModal, setShowModal] = useState(false);
    const [getFormData, setFormData] = useState('');
    const [getSubmittedData, setSubmittedData] = useState('');

    const handleFormSubmit = (e: Event) => {
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

    return (
        <div>
            <h1>Exercise 3.2: Component Library Demo</h1>

            <h2>1. Card Component</h2>
            <Card title="Card with title">
                <p>This is card content</p>
            </Card>

            <Card>
                <p>Card without title</p>
            </Card>

            <Card title="Clickable Card" onClick={() => alert('Card clicked!')}>
                <p>Click this card</p>
            </Card>

            <h2>2. Modal Component</h2>
            <p>Current modal state: {getShowModal() ? 'OPEN' : 'CLOSED'}</p>
            <button onClick={handleOpenModal}>Open Modal</button>

            <Modal
                isOpen={getShowModal()}
                onClose={handleCloseModal}
                title="Test Modal"
            >
                <p>Modal content here</p>
                <p>Click outside or Close button to close</p>
            </Modal>

            <h2>3. Form & Input Components</h2>
            <Card title="Form Test">
                <Form onSubmit={handleFormSubmit}>
                    <Input
                        value={getFormData()}
                        onChange={(e) => setFormData(e.target.value)}
                        placeholder="Type something"
                    />
                    <button type="submit">Submit</button>
                </Form>

                {getSubmittedData() && (
                    <p>Submitted: {getSubmittedData()}</p>
                )}
            </Card>

            <h2>4. Combined Test</h2>
            <Card title="All Together">
                <Input placeholder="Input in card" />
                <button onClick={handleOpenModal}>Open Modal</button>
            </Card>
        </div>
    );
};

const app = (
    <ComponentLibraryDemo />
);

// mount(<TestDelegation /> as unknown as VNode, document.getElementById("root")!);
// mount(app as unknown as VNode, document.getElementById("root")!);
mount(app as unknown as VNode, document.getElementById("root")!);
