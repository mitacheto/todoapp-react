import React, { useContext, useEffect, useState } from 'react';
import { CredentialsContext } from '../App';

export default function Todos() {
    const [todos, setTodos] = useState([]);
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [todoText, setTodoText] = useState('');
    const [credentials] = useContext(CredentialsContext);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('uncompleted');
    const [updatedStateOfTodos, setUpdatedStateOfTodos] = useState();

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
        console.log('here');
        fetch('http://localhost:4000/todos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': `${localStorage.token}`,
            },
        })
            .then((response) => response.json())
            .then((todos) => {
                if (todos) {
                    setTodos(todos);
                    setFilteredTodos(todos.filter((todo) => (filter === 'uncompleted' ? !todo.checked : todo.checked)));
                }
                setUpdatedStateOfTodos(false);
                setLoading(false);
            });
    }, [, updatedStateOfTodos]);

    useEffect(() => {
        setFilteredTodos(todos.filter((todo) => (filter === 'uncompleted' ? !todo.checked : todo.checked)));
    }, [filter]);

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
        setUpdatedStateOfTodos(true);
    };

    const toggleTodo = (index) => {
        const newTodoList = [...todos];
        const task = newTodoList.find((task) => task._id === index);

        task.checked = !task.checked;

        setTodos(newTodoList);
        setFilteredTodos(newTodoList.filter((todo) => (filter === 'uncompleted' ? !todo.checked : todo.checked)));
        persist(newTodoList);
    };

    const changeFilter = (newFilter) => {
        setFilter(newFilter);
    };

    return (
        <>
            {loading ? (
                <div>Loading Tasks</div>
            ) : (
                <div>
                    <select onChange={(e) => changeFilter(e.target.value)}>
                        <option value='uncompleted'>Uncompleted</option>
                        <option value='completed'>Completed</option>
                    </select>
                    {filteredTodos &&
                        filteredTodos.map((todo) => (
                            <div key={todo._id}>
                                <input checked={todo.checked} onChange={() => toggleTodo(todo._id)} type='checkbox' />
                                <label>{todo.text}</label>
                            </div>
                        ))}
                    <br />
                    <form onSubmit={addTodo}>
                        <input value={todoText} onChange={(e) => setTodoText(e.target.value)} type='text' />
                        <button type='submit'>Add</button>
                    </form>
                </div>
            )}
        </>
    );
}
