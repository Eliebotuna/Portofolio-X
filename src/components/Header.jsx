import React, { useState, useEffect } from 'react';
import '../styles/header.css';
import Hero from './Hero';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    setMenuOpen(false);
  };

  // Style en ligne pour garantir la visibilité du bouton hamburger
  const hamburgerStyle = {
    display: isMobile ? 'block' : 'none',
    fontSize: '28px',
    color: '#e8a617',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    marginLeft: 'auto',
    padding: '5px 10px'
  };

  return (
    <header className="header">
      <div className="header-container">
        <a href="#home" className="logo" onClick={(e) => {
          e.preventDefault();
          scrollToTop();
        }}>
          ELIE BOTUNA
        </a>
        <nav className={menuOpen ? "active" : ""}>
          <a href="#Hero" onClick={(e) => {
            e.preventDefault();
            scrollToTop(Hero);
          }}>Home</a>
          <a href="#services" onClick={(e) => {
            e.preventDefault();
            scrollToSection('services');
          }}>Services</a>
          <a href="#about" onClick={(e) => {
            e.preventDefault();
            scrollToSection('about');
          }}>About me</a>
          <a href="#portfolio" onClick={(e) => {
            e.preventDefault();
            scrollToSection('portfolio');
          }}>Portfolio</a>
          <a href="#contact" onClick={(e) => {
            e.preventDefault();
            scrollToSection('contact');
          }}>Contact me</a>
        </nav>
        <button 
          style={hamburgerStyle} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
        {!isMobile && (
          <button className="hire-btn" onClick={() => scrollToSection('contact')}>
            Hire Me
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;