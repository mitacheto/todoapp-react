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
        <>
            <h1 className='welcomeText'>
                Welcome to your <span className='appName'>To Do List</span>
            </h1>
            <div className='buttonsContainer'>
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
        </>
    );
}
