import React, {useState} from 'react';
import axios from 'axios';

import {Link, useNavigate} from 'react-router-dom';
import './Register.css';

export default function Register({onRegister}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate()
    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        try {
            const res = await axios.post('http://localhost:3000/api/authorization/register', {username, password});
            alert('Registration successfully, please login')
            navigate('/login')

        } catch (error) {
            alert('Registration failed:'+ error.response.data.message)
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className="register-container">
            <h2>Welcome! Please Register</h2>
            <input
                type="text"
                className="register-input"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                className="register-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="password"
                className="register-input"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button className="register-button" onClick={handleRegister}>
                Register
            </button>
            <p>
                Already have an account? <Link to="/login">Login here</Link>
            </p>
        </div>
    );
}
