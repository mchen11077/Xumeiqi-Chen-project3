import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './Login.css';
import axios from "axios";

export default function Login({onLogin}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate()
    const handleLogin = async () => {

        try {
            const res = await axios.post('http://localhost:3000/api/authorization/login', {username, password});
            alert('Login successfully')
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('userInfo', res.data.user)
            navigate('/password-manager')
        } catch (error) {
            alert('Login failed:'+ error.response.data.message)
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="login-container">
            <h2>Welcome back!</h2>
            <input type="text" className="login-input" placeholder="Username" value={username}
                   onChange={(e) => setUsername(e.target.value)}/>
            <input type="password" className="login-input" placeholder="Password" value={password}
                   onChange={(e) => setPassword(e.target.value)}/>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button className="login-button" onClick={handleLogin}>Login</button>
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
    );
}
