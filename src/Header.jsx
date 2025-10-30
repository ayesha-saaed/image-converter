import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      {/* Logo Area */}
      <div className="logo-area">
        <a
          href="https://www.brainhub.uk"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="brainhub_logo.webp"
            alt="Brainhub logo"
            className="logo"
          />
        </a>
      </div>

      {/* Navigation */}
      <nav className="nav-links">
        <a
          href="https://brainhub.uk/about-us/"
          target="_blank"
          rel="noopener noreferrer"
          className="glow-on-hover"
        >
          About Us
        </a>
        <a
          href="https://brainhub.uk/contact-us/"
          target="_blank"
          rel="noopener noreferrer"
          className="glow-on-hover"
        >
          Contact Us
        </a>
      </nav>
    </header>
  );
};

export default Header;
