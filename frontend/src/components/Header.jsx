import React, { useContext } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import bgImage from "../assets/bg_image.jpg";
import { AppContext } from '../context/AppContext';

function Header() {
  const navigate = useNavigate();

  const { removeBg} = useContext(AppContext)

  return (
    <div className="header-container">
      {/* Left side */}
      <div className="header-content">
        <h1 className="header-title">
          Remove the 
          <br className="hide-md" />
          <span className='background'> background </span> from 
          <br className="hide-md" /> images for free
        </h1>
        <p className="header-desc">
          Transform your photos effortlessly! With Our BG-removal software, you can easily eliminate background from images, enhancing your creativity and making your visuals pop.
          <br className="hide-md" /> Whether for social media, marketing, or personal projects, our tool is designed for everyone, ensuring high-quality results in just a few seconds.
        </p>
        <div  className="upload-box">
          <input onChange={e => removeBg(e.target.files[0])} type="file" id="upload1" accept="image/*" hidden />
          <label htmlFor="upload1" className="upload-btn">
            <span>Upload Image</span>
          </label>
        </div>
      </div>

      {/* Right side */}
      <div className="header-right">
        <img 
          src={bgImage} 
          alt="background"
          onClick={() => navigate("/")}
          className="header-image"
        />
      </div>
    </div>
  );
}

export default Header;
