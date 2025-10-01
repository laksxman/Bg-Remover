import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar-container">
      <div className="navbar-logo" onClick={() => navigate("/")}>
        <span className="logo-text">BG<span>Remover</span></span>
      </div>

      <div className="navbar-right">
        <button className="login-btn" onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    </div>
  );
};

export default NavBar;
