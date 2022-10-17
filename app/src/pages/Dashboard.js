import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CredentialsContext } from '../App';
import Todos from '../components/Todos';
import { getUserInfo } from '../services/getUserInfo';

export default function Dashboard() {
    const navigate = useNavigate();

    const [credentials, setCredentails] = useContext(CredentialsContext);
    const [username, setUsername] = useState();

    useEffect(() => {
        (async () => {
            await getUserInfo()
                .then((res) => res.json())
                .then((userData) => {
                    setUsername(userData.user.username);
                });
        })();
    }, []);

    const logout = () => {
        setCredentails(null);
        localStorage.clear();
        navigate('/');
    };

    return (
        <>
            <button onClick={logout}>Logout</button>
            <h1>Welcome {username}</h1>
            <div>{<Todos />}</div>
        </>
    );
}
