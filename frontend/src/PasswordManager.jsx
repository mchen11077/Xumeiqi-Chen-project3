// PasswordManager.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PasswordManager.css';

export default function PasswordManager({ user }) {
  const [url, setUrl] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState({
    alphabet: false,
    numerals: false,
    symbols: false
  });
  const [length, setLength] = useState(12);
  const [passwords, setPasswords] = useState([]);
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    if (user) {
      const fetchPasswords = async () => {
        try {
          const res = await axios.get(`http://localhost:3000/api/password/${user._id}`);
          setPasswords(res.data);
        } catch (error) {
          console.error('Failed to fetch passwords:', error);
        }
      };
      fetchPasswords();
    }
  }, [user]);

  const handleGeneratePassword = () => {
    const generatedPassword = generatePassword(isChecked, length);
    setPassword(generatedPassword);
  };

  const generatePassword = (options, length) => {
    length = parseInt(length);
    const chars = [];
    if (options.alphabet) chars.push('abcdefghijklmnopqrstuvwxyz');
    if (options.numerals) chars.push('0123456789');
    if (options.symbols) chars.push('!@#$%^&*()_+');
    const charset = chars.join('');
    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }
    return generatedPassword;
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:3000/api/password', { userId: user._id, url, password });
      setUrl('');
      setPassword('');
      const res = await axios.get(`http://localhost:3000/api/password/${user._id}`);
      setPasswords(res.data);
    } catch (error) {
      console.error('Password submission failed:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/password/${id}`);
      const updatedPasswords = password.filter(password => password._id !== id);
      setPasswords(updatedPasswords);
    } catch (error) {
      console.error('Password deletion failed:', error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/password/${id}`, { password: newPassword });
      const updatedPasswords = password.map(password =>
          password._id === id ? { ...password, password: newPassword } : password
      );
      setPasswords(updatedPasswords);
    } catch (error) {
      console.error('Password update failed:', error);
    }
  };

  return (
      <div className="password-manager-container">
        <h2>Password Manager</h2>
        <input type="text" className="password-manager-input" placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)} />
        <input type="password" className="password-manager-input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <label>
          <input type="checkbox" className="password-manager-checkbox" checked={isChecked.alphabet} onChange={() => setIsChecked({ ...isChecked, alphabet: !isChecked.alphabet })} /> Alphabet
        </label>
        <label>
          <input type="checkbox" className="password-manager-checkbox" checked={isChecked.numerals} onChange={() => setIsChecked({ ...isChecked, numerals: !isChecked.numerals })} /> Numerals
        </label>
        <label>
          <input type="checkbox" className="password-manager-checkbox" checked={isChecked.symbols} onChange={() => setIsChecked({ ...isChecked, symbols: !isChecked.symbols })} /> Symbols
        </label>
        <input type="number" className="password-manager-input" value={length} onChange={(e) => setLength(e.target.value)} />
        <button className="password-manager-button" onClick={handleGeneratePassword}>Generate Password</button>
        <button className="password-manager-button" onClick={handleSubmit}>Submit</button>
        <ul>
          {passwords.map(password => (
              <li key={password._id}>
                <span>{password.url}</span>
                <span>{password.createdAt}</span>
                <span>{password.password}</span>
                <button onClick={() => handleDelete(password._id)}>Delete</button>
                <input type="text" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                <button onClick={() => handleUpdate(password._id)}>Update</button>
              </li>
          ))}
        </ul>
      </div>
  );
}
