// src/pages/Register.jsx
import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import './Login.css';

const Register = () => {
  const { handleRegister } = useContext(AppContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitRegister = async () => {
    try {
      const res = await handleRegister({ username: name, email, password })
      alert("Register Success ")
    } catch (err) {
      alert("Register Failed  " + err.message)
    }
  }


  return (
    <div className="auth-container">
      <h2 className="auth-title">Register</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={submitRegister} className="auth-btn">Register</button>
      <p className="auth-switch">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
