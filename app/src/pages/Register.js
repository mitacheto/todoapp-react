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
                navigate('/dashboard');
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    return (
        <div>
            <h1 className='registerText'>Register</h1>
            {error && <div className='errorMsg'>{error}</div>}
            <form onSubmit={register} className='registerForm'>
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
                        <label htmlFor='confirmPassword'>Confirm Password</label>
                        <input type='password' onChange={confirmPasswordStateHandler} id='password' />
                    </li>
                    <li>
                        <button type='Submit'>Register</button>
                    </li>
                </ul>
            </form>
            <div className='haveRegistrationText'>
                Already have registration? <Link to='/login'>Login</Link>
            </div>
        </div>
    );
}
