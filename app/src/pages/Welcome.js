import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CredentialsContext } from '../App';
import './Welcome.scss';

export default function Welcome() {
    const [credentials, setCredentails] = useContext(CredentialsContext);
    const navigate = useNavigate();

    if (localStorage.length > 0) {
        setCredentails(localStorage.getItem('token'));
        navigate('/dashboard');
    }

    return (
        <div className='welcome-container'>
            <h1 className='welcome-text'>
                Welcome to your <span className='app-name'>To Do List</span>
            </h1>
            <div className='buttons-container'>
                {!credentials && (
                    <Link to='/login' className='button'>
                        Login
                    </Link>
                )}
                {!credentials && (
                    <Link to='/register' className='button'>
                        Register
                    </Link>
                )}
            </div>
        </div>
    );
}
