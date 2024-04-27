import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import axios from 'axios';

import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import PasswordManager from './PasswordManager';

export default function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const handleLogout = async () => {
        try {
            await axios.post('/logout');
            setUser(null);
        } catch (error) {
            setError('Logout failed. Please try again.');
            console.error('Logout failed:', error);
        }
    };

    const checkUserAuthentication = async () => {
        try {
            const res = await axios.get('/check');
            setUser(res.data.user);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError('User authentication check failed. Please try again later.');
            }
            console.error('User authentication check failed:', error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <Router>
            <Navbar isAuthenticated={user !== null} username={user?.username} onLogout={handleLogout}/>
            {error && <div>Error: {error}</div>}
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/password-manager" element={<PasswordManager user={user}/>}/>
            </Routes>
        </Router>
    );
}
