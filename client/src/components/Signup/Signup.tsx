import React from 'react';
import './Signup.css';

const Signup: React.FC = () => {
  return (
    <div className="signup-container">
      <h1 className="signup-title">Signup</h1>
      <div className="signup-textfields">
        <input type="text" placeholder="Username" className="signup-input" />
        <input type="email" placeholder="Email" className="signup-input" />
        <input type="password" placeholder="Password" className="signup-input" />
      </div>
      <button className="signup-button">Signup</button>
      <div className="line-under-button"></div>
      <button className="redirect-button">Already have an account? Login</button>
    </div>
  );
};

export default Signup;
