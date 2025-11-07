/** @jsx createElement */
import { createElement, useState } from './jsx-runtime';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
    createdAt: Date;
}

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    key?: number;
}

interface TodoListProps {
    todos: Todo[];
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
    return (
        <li style={{ marginBottom: '8px' }}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
            />
            <span
                style={{
                    marginLeft: '8px',
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    cursor: 'pointer'
                }}
            >
            {todo.text}
            </span>
            <button
                onClick={() => onDelete(todo.id)}
                style={{ marginLeft: '10px' }}
            >
                Delete
            </button>
        </li>
    );
};

const AddTodoForm = ({ onAdd }: { onAdd: (text: string) => void }) => {
    const [getText, setText] = useState('');

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        const value = getText().trim();
        if (value) {
            onAdd(value);
            setText('');
        }
    };

    const handleChange = (e: any) => setText(e.target.value);

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '10px' }}>
            <input
                type="text"
                placeholder="Enter a new todo"
                value={getText()}
                onInput={handleChange}
            />
            <button type="submit" style={{ marginLeft: '5px' }}>Add</button>
        </form>
    );
};

const TodoApp = () => {
    // Default todos
    const [getTodos, setTodos] = useState<Todo[]>([]);

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
    const addTodo = (text: string) => {
        const newTodo: Todo = {
            id: Date.now(),
            text,
            completed: false,
            createdAt: new Date(),
        };
        setTodos([...getTodos(), newTodo]);
        console.log('Todo added:', newTodo);
    };

    // Toggle completed
    const toggleTodo = (id: number) => {
        const updated = getTodos().map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updated);
        console.log('Todo toggled:', id);
    };

    // Remove todo
    const deleteTodo = (id: number) => {
        const updated = getTodos().filter(todo => todo.id !== id);
        setTodos(updated);
        console.log('Todo deleted:', id);
    };

    // Compute total todos completed
    const total = getTodos().length;
    const completed = getTodos().filter(t => t.completed).length;

    return (
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <h2>Todo List</h2>

            <AddTodoForm onAdd={addTodo} />

            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {getTodos().map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={toggleTodo}
                        onDelete={deleteTodo}
                    />
                ))}
            </ul>

            <p>
                Total: {total} | Completed: {completed}
            </p>
        </div>
    );
};

export { TodoApp };
