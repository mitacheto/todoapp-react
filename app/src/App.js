import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import './App.css';

export const CredentialsContext = React.createContext(null);

export default function App() {
    const credentialsState = useState();
    return (
        <div className='App'>
            <CredentialsContext.Provider value={credentialsState}>
                <Router>
                    <Routes>
                        <Route path='/' element={<Welcome />}></Route>
                        <Route path='/register' element={<Register />}></Route>
                        <Route path='/login' element={<Login />}></Route>
                    </Routes>
                </Router>
            </CredentialsContext.Provider>
        </div>
    );
}
