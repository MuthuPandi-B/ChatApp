import React, { useState } from 'react';
import axios from 'axios';
import Api from '../Api/api';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Api.post('/api/users/register', { usernameOrEmail: username, email, password });
      alert('User registered successfully');
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <div>
        <label>Username:</label>
        <input type="text" value={usernameOr} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
