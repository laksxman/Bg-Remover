import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-top">
        {/* Text logo */}
        <h2 className="footer-logo-text">BG<span style={{ color: "#3b82f6" }}>Remover</span></h2>
        
        <div className="footer-links">
          <div className="footer-column">
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Contact</a>
          </div>
          <div className="footer-column">
            <h4>Resources</h4>
            <a href="#">Blog</a>
            <a href="#">Help Center</a>
            <a href="#">Privacy Policy</a>
          </div>
          <div className="footer-column">
            <h4>Follow Us</h4>
            <div className="footer-socials">
              <Facebook size={20} />
              <Twitter size={20} />
              <Instagram size={20} />
              <Linkedin size={20} />
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} BGRemover. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
