import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3500/register', { name, email, phone, password });
      setNotification('Registration successful. Check your email for activation link.');
    } catch (error) {
      console.error('Registration failed:', error.response.data);
      setNotification('Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Phone:</label>
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleRegister}>Register</button>
      <p>{notification}</p>
    </div>
  );
};

export default Register;
