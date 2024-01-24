import React, { useState } from 'react';
import Register from './components/Register.js';
import Login from './components/Login.js';
import Home from './components/Home';

function App() {
  const [token, setToken] = useState('');

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  return (
    <div>
      <h1>Registration Module</h1>
      {!token && (
        <div>
          <Register />
          <Login onLogin={handleLogin} />
        </div>
      )}
      {token && <Home userName="User" />}
    </div>
  );
}

export default App;
