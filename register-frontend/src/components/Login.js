import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3500/login', { email, password });
      onLogin(response.data.token);
      setNotification('');
    } catch (error) {
      console.error('Login failed:', error.response.data);
      setNotification(error.response.data);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleLogin}>Login</button>
      <p>{notification}</p>
    </div>
  );
};

export default Login;
