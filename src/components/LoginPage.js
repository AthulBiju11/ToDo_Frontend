import React from 'react';
import '../styles/LoginPage.css';
import TextField from '@mui/material/TextField';

function LoginPage() {
  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="login-form">
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;