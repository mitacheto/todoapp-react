import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CredentialsContext } from '../App';
import { handleErrors } from '../services/handleErrors';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [, setCredentials] = useContext(CredentialsContext);
    const navigate = useNavigate();

    const usernameStateHandler = (e) => {
        setUsername(e.target.value);
    };

    const passwordStateHandler = (e) => {
        setPassword(e.target.value);
    };

    const confirmPasswordStateHandler = (e) => {
        setConfirmPassword(e.target.value);
    };

    const register = (e) => {
        setError('');

        e.preventDefault();

        if (username === '' || password === '') {
            setError('Username and password must be filled');
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords doesn't match");
            return;
        }

        fetch('http://localhost:4000/user/register', {
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
            <h1>Register</h1>
            {error && <span style={{ color: 'red' }}>{error}</span>}
            <form onSubmit={register}>
                <label htmlFor='username'>Username</label>
                <input onChange={usernameStateHandler} id='username' />
                <br />
                <label htmlFor='password'>Password</label>
                <input type='password' onChange={passwordStateHandler} id='password' />
                <br />
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input type='password' onChange={confirmPasswordStateHandler} id='password' />
                <br />
                <button type='Submit'>Register</button>
            </form>
        </div>
    );
}
