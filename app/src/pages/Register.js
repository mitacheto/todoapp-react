import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CredentialsContext } from '../App';
import { handleErrors } from '../services/handleErrors';
import './Register.scss';

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

        if (password.length < 8) {
            setError('Password needs to be atleast 8 characters');
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
                setCredentials(res.token);
                navigate('/login');
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    return (
        <div className='login-container'>
            <h1 className='register-header'>Register</h1>
            {error && <div className='error-message'>{error}</div>}
            <form onSubmit={register} className='register-form'>
                <div className='register-item'>
                    <label htmlFor='username'>Username</label>
                    <input onChange={usernameStateHandler} id='username' />
                </div>
                <div className='register-item'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' onChange={passwordStateHandler} id='password' />
                </div>
                <div className='register-item'>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input type='password' onChange={confirmPasswordStateHandler} id='password' />
                </div>
                <div className='register-item'>
                    <button type='submit'>Register</button>
                </div>
            </form>
            <div className='have-registration'>
                Already have registration? <Link to='/login'>Login</Link>
            </div>
        </div>
    );
}
