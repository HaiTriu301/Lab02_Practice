"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoApp = void 0;
/** @jsx createElement */
const jsx_runtime_1 = require("./jsx-runtime");
const TodoItem = ({ todo, onToggle, onDelete }) => {
    return ((0, jsx_runtime_1.createElement)("li", { style: { marginBottom: '8px' } },
        (0, jsx_runtime_1.createElement)("input", { type: "checkbox", checked: todo.completed, onChange: () => onToggle(todo.id) }),
        (0, jsx_runtime_1.createElement)("span", { style: {
                marginLeft: '8px',
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer'
            } }, todo.text),
        (0, jsx_runtime_1.createElement)("button", { onClick: () => onDelete(todo.id), style: { marginLeft: '10px' } }, "Delete")));
};
const AddTodoForm = ({ onAdd }) => {
    const [getText, setText] = (0, jsx_runtime_1.useState)('');
    const handleSubmit = (e) => {
        e.preventDefault();
        const value = getText().trim();
        if (value) {
            onAdd(value);
            setText('');
        }
    };
    const handleChange = (e) => setText(e.target.value);
    return ((0, jsx_runtime_1.createElement)("form", { onSubmit: handleSubmit, style: { marginBottom: '10px' } },
        (0, jsx_runtime_1.createElement)("input", { type: "text", placeholder: "Enter a new todo", value: getText(), onInput: handleChange }),
        (0, jsx_runtime_1.createElement)("button", { type: "submit", style: { marginLeft: '5px' } }, "Add")));
};
const TodoApp = () => {
    // Default todos
    const [getTodos, setTodos] = (0, jsx_runtime_1.useState)([]);
    // Example with 1 todo added to see complete, delete, total, mark completed
    // const [getTodos, setTodos] = useState<Todo[]>([
    //     {
    //         id: 1,
    //         text: "Study JSX runtime",
    //         completed: false,
    //         createdAt: new Date(),
    //     },
    // ]);
    // Add new todo
    const addTodo = (text) => {
        const newTodo = {
            id: Date.now(),
            text,
            completed: false,
            createdAt: new Date(),
        };
        setTodos([...getTodos(), newTodo]);
        console.log('Todo added:', newTodo);
    };
    // Toggle completed
    const toggleTodo = (id) => {
        const updated = getTodos().map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
        setTodos(updated);
        console.log('Todo toggled:', id);
    };
    // Remove todo
    const deleteTodo = (id) => {
        const updated = getTodos().filter(todo => todo.id !== id);
        setTodos(updated);
        console.log('Todo deleted:', id);
    };
    // Compute total todos completed
    const total = getTodos().length;
    const completed = getTodos().filter(t => t.completed).length;
    return ((0, jsx_runtime_1.createElement)("div", { style: { textAlign: 'center', marginTop: '40px' } },
        (0, jsx_runtime_1.createElement)("h2", null, "Todo List"),
        (0, jsx_runtime_1.createElement)(AddTodoForm, { onAdd: addTodo }),
        (0, jsx_runtime_1.createElement)("ul", { style: { listStyleType: 'none', padding: 0 } }, getTodos().map(todo => ((0, jsx_runtime_1.createElement)(TodoItem, { key: todo.id, todo: todo, onToggle: toggleTodo, onDelete: deleteTodo })))),
        (0, jsx_runtime_1.createElement)("p", null,
            "Total: ",
            total,
            " | Completed: ",
            completed)));
};
exports.TodoApp = TodoApp;
