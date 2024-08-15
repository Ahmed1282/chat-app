import React, { useState } from 'react';
import { handleLogin } from '../../services/login-service';
import './Login.scss';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin(email, password);
  };

  const redirectToSignup = () => {
    window.location.href = 'http://localhost:5173/signup';
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>

      <form className="login-form" onSubmit={onSubmitHandler}>
        <input
          type="email"
          placeholder="Email Address"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login-button">Login</button>
      </form>

      <div className="login-separator">
        <span className="separator-line"></span>
        <span className="separator-text">or</span>
        <span className="separator-line"></span>
      </div>

      <button className="signup-redirect-button" onClick={redirectToSignup}>
        Create a new account
      </button>
    </div>
  );
};

export default Login;
