// src/pages/Login.jsx
import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import './Login.css';

const Login = () => {
  const { handleLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitLogin = async () => {
    try {
      const res = await handleLogin({ email, password });
      alert('Login Success ');
      navigate('/'); 
    } catch (err) {
      alert('Login Failed  ' + err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Login</h2>
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
      <button onClick={submitLogin} className="auth-btn">Login</button>
      <p className="auth-switch">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
