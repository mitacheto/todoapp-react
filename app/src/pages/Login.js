import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CredentialsContext } from '../App';
import { handleErrors } from '../services/handleErrors';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [, setCredentials] = useContext(CredentialsContext);
    const navigate = useNavigate();

    const usernameStateHandler = (e) => {
        setUsername(e.target.value);
    };

    const passwordStateHandler = (e) => {
        setPassword(e.target.value);
    };

    const login = (e) => {
        setError('');

        e.preventDefault();

        if (username === '' || password === '') {
            setError('Username and password must be filled');
            return;
        }

        fetch('http://localhost:4000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        })
            .then(handleErrors)
            .then((res) => {
                localStorage.setItem('token', res.token);
                setCredentials({
                    username,
                    password,
                });
                navigate('/');
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    return (
        <div>
            <h1>Login</h1>
            {error && <span style={{ color: 'red' }}>{error}</span>}
            <form onSubmit={login}>
                <label htmlFor='username'>Username</label>
                <input onChange={usernameStateHandler} id='username' />
                <br />
                <label htmlFor='password'>Password</label>
                <input type='password' onChange={passwordStateHandler} id='password' />
                <br />
                <button type='Submit'>Login</button>
            </form>
        </div>
    );
}
