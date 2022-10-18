import React, { useEffect, useState } from 'react';
import './Todos.scss';

export default function Todos() {
    const [todos, setTodos] = useState([]);
    const [todoText, setTodoText] = useState('');
    const [loading, setLoading] = useState(true);

    const persist = (newTodos) => {
        fetch('http://localhost:4000/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': `${localStorage.token}`,
            },
            body: JSON.stringify(newTodos),
        }).then((res) => {});
    };

    useEffect(() => {
        fetch('http://localhost:4000/todos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': `${localStorage.token}`,
            },
        })
            .then((response) => response.json())
            .then((todos) => {
                if (!todos.message) {
                    setTodos(todos);
                }
                setLoading(false);
            });
    }, []);

    const addTodo = (e) => {
        e.preventDefault();

        if (!todoText) {
            return;
        }

        const newTodo = { checked: false, text: todoText };
        const newTodos = [...todos, newTodo];

        setTodos(newTodos);
        setTodoText('');
        persist(newTodos);
    };

    const toggleTodo = (index) => {
        const newTodoList = [...todos];
        const task = newTodoList.find((task) => task._id === index);

        task.checked = !task.checked;

        setTodos(newTodoList);
        persist(newTodoList);
    };

    // TODO: make the remove task button to work
    return (
        <div className='todosContainer'>
            {loading ? (
                <div>Loading Tasks</div>
            ) : (
                <>
                    {todos &&
                        todos.map((todo) => (
                            <div className='taskContainer' key={todo._id}>
                                <div className={todo.checked ? 'finished' : 'unfinished'} key={todo._id}>
                                    <input checked={todo.checked} onChange={() => toggleTodo(todo._id)} type='checkbox' />
                                    <label>{todo.text}</label>
                                </div>
                                <span className='removeTask'>
                                    <button className='removeBtn'>Remove</button>
                                </span>
                            </div>
                        ))}
                    <br />
                    <form className='createTaskForm' onSubmit={addTodo}>
                        <input className='textInput' value={todoText} onChange={(e) => setTodoText(e.target.value)} type='text' />
                        <button className='submitBtn' type='submit'>
                            Add
                        </button>
                    </form>
                </>
            )}
        </div>
    );
}
