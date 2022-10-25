import React, { useContext, useEffect, useState } from 'react';
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

    useEffect(() => {
        if (localStorage.length > 0) {
            setCredentials(localStorage.getItem('token'));
            navigate('/dashboard');
        }
    }, []);

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
        <div className='login-container'>
            <h1 className='login-header'>Login</h1>
            {error && <div className='error-message'>{error}</div>}
            <form onSubmit={login} className='login-form'>
                <div className='login-item'>
                    <label htmlFor='username'>Username</label>
                    <input onChange={usernameStateHandler} id='username' />
                </div>
                <div className='login-item'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' onChange={passwordStateHandler} id='password' />
                </div>
                <div className='login-item'>
                    <button type='submit'>Login</button>
                </div>
            </form>
            <div className='no-registration'>
                Don't have registration ? <Link to='/register'>Register</Link>
            </div>
        </div>
    );
}
