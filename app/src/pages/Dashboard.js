import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CredentialsContext } from '../App';
import Todos from '../components/Todos';
import { getUserInfo } from '../services/getUserInfo';
import './Dashboard.scss';

export default function Dashboard() {
    const navigate = useNavigate();

    const [, setCredentials] = useContext(CredentialsContext);
    const [username, setUsername] = useState();

    useEffect(() => {
        (async () => {
            await getUserInfo()
                .then((res) => res.json())
                .then((userData) => {
                    if (userData) {
                        if (userData.msg !== 'Token is not valid') {
                            setCredentials(localStorage.getItem('token'));
                            setUsername(userData.user.username);
                        } else {
                            setCredentials(null);
                            localStorage.clear();
                            navigate('/');
                        }
                    }
                });
        })();
    }, []);

    const logout = () => {
        setCredentials(null);
        localStorage.clear();
        navigate('/');
    };

    return (
        <div className='dashboard'>
            <button className='logoutBtn' onClick={logout}>
                Logout
            </button>
            <h1 className='greetingText'>
                Welcome <span className='usernameGreet'>{username}</span>
            </h1>
            {<Todos />}
        </div>
    );
}
