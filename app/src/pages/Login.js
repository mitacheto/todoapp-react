import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CredentialsContext } from '../App';
import { handleErrors } from '../services/handleErrors';
import './Login.scss';

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
                setCredentials(res.token);
                navigate('/dashboard');
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    return (
        <div>
            <h1 className='loginText'>Login</h1>
            {error && <div className='errorMsg'>{error}</div>}
            <form onSubmit={login} className='loginForm'>
                <ul>
                    <li>
                        <label htmlFor='username'>Username</label>
                        <input onChange={usernameStateHandler} id='username' />
                    </li>
                    <li>
                        <label htmlFor='password'>Password</label>
                        <input type='password' onChange={passwordStateHandler} id='password' />
                    </li>
                    <li>
                        <button type='Submit'>Login</button>
                    </li>
                </ul>
            </form>
            <div className='dontHaveRegistrationText'>
                Don't have registration ? <Link to='/register'>Register</Link>
            </div>
        </div>
    );
}
