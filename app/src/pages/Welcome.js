import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { CredentialsContext } from '../App';
import Todos from '../components/Todos';

export default function Welcome() {
    const [credentials, setCredentails] = useContext(CredentialsContext);
    if (localStorage.length > 0) {
    }
    const logout = () => {
        setCredentails(null);
        localStorage.clear();
    };

    return (
        <div>
            {credentials && <button onClick={logout}>Logout</button>}
            <h1>Welcome {credentials && credentials.username}</h1>
            {!credentials && <Link to='/login'>Login</Link>}
            <br />
            {!credentials && <Link to='/register'>Register</Link>}
            {credentials && <Todos />}
        </div>
    );
}
