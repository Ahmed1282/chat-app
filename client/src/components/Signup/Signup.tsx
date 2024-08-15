import React, { useState } from 'react';
import { handleSignup, redirectToLogin } from '../../services/signup-service';
import './Signup.scss';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await handleSignup(name, username, password, phoneNumber, email);
      console.log('Signup successful');
      redirectToLogin();
    } catch (error) {
      console.error('Error during signup:', error);
      alert("Error, kindly check your inputs");
    }
  };


  return (
    <div className="signup-container">
      <h1 className="signup-title">Signup</h1>

      <form className="signup-form" onSubmit={onSubmitHandler}>
        <input
          type="text"
          placeholder="Name"
          className="signup-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          className="signup-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="signup-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          className="signup-input"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="signup-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="signup-input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" className="signup-button">Signup</button>
      </form>

      <div className="signup-separator">
        <span className="separator-line"></span>
        <span className="separator-text">or</span>
        <span className="separator-line"></span>
      </div>

      <button className="login-redirect-button" onClick={redirectToLogin}>
        Already have an account? <span className="login-text">Login</span>
      </button>
    </div>
  );
};

export default Signup;
