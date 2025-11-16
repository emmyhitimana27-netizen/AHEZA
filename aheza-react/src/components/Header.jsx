import React, { useEffect, useState } from 'react';
import { useApp } from '../contexts/AppContext';

const Header = () => {
  const {
    theme,
    language,
    cart,
    isMobileMenuOpen,
    setTheme,
    setLanguage,
    toggleMobileMenu,
    toggleCart
  } = useApp();

  const [scrolled, setScrolled] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const themes = ['default', 'dark', 'nature', 'luxury'];
  const themeIcons = {
    'default': 'fa-moon-stars',
    'dark': 'fa-sun',
    'nature': 'fa-leaf',
    'luxury': 'fa-crown'
  };

  const toggleTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setLangDropdownOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    toggleMobileMenu();
  };

  return (
    <header className={`main-header ${scrolled ? 'scrolled' : ''}`}>
      <nav className="nav-container">
        <div className="logo">
          <div className="logo-icon">🌙</div>
          <div className="logo-text">
            <span className="logo-main">AHEZA 2050</span>
            <span className="logo-sub">Sleep Revolution</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="nav-right desktop-nav">
          <div className="language-selector">
            <button 
              className="lang-btn" 
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            >
              <i className="fa-solid fa-earth-americas"></i>
              <span id="current-lang">{language.toUpperCase()}</span>
              <i className="fa-solid fa-angle-down"></i>
            </button>
            <div className={`lang-dropdown ${langDropdownOpen ? 'active' : ''}`}>
              <button onClick={() => handleLanguageChange('en')}>English</button>
              <button onClick={() => handleLanguageChange('fr')}>Français</button>
              <button onClick={() => handleLanguageChange('rw')}>Kinyarwanda</button>
            </div>
          </div>

          <ul className="nav-links">
            <li>
              <a href="#home" className="nav-link active">
                <i className="fa-solid fa-house"></i>
                <span>Home</span>
              </a>
            </li>
            <li>
              <a href="#mattresses" className="nav-link">
                <i className="fa-solid fa-bed"></i>
                <span>Mattresses</span>
              </a>
            </li>
            <li>
              <a href="#technology" className="nav-link">
                <i className="fa-solid fa-microchip"></i>
                <span>Technology</span>
              </a>
            </li>
            <li>
              <a href="#testimonials" className="nav-link">
                <i className="fa-solid fa-comments"></i>
                <span>Testimonials</span>
              </a>
            </li>
            <li>
              <a href="#contact" className="nav-link">
                <i className="fa-solid fa-envelope"></i>
                <span>Contact</span>
              </a>
            </li>
          </ul>

          <div className="nav-controls">
            <button className="theme-toggle" onClick={toggleTheme}>
              <i className={`fa-solid ${themeIcons[theme]}`}></i>
            </button>
            <button className="cart-btn" onClick={toggleCart}>
              <i className="fa-solid fa-bag-shopping"></i>
              <span className="cart-count">{totalItems}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="nav-right mobile-nav">
          <div className="language-selector">
            <button className="lang-btn">
              <i className="fa-solid fa-earth-americas"></i>
              <span id="current-lang-mobile">{language.toUpperCase()}</span>
            </button>
          </div>

          <button 
            className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-content">
          <div className="mobile-menu-header">
            <div className="logo">
              <div className="logo-icon">🌙</div>
              <div className="logo-text">
                <span className="logo-main">AHEZA 2050</span>
                <span className="logo-sub">Sleep Revolution</span>
              </div>
            </div>
            <button className="close-mobile-menu" onClick={toggleMobileMenu}>
              &times;
            </button>
          </div>
          
          <ul className="mobile-nav-links">
            <li>
              <a 
                href="#home" 
                className="mobile-nav-link active"
                onClick={() => scrollToSection('home')}
              >
                <i className="fa-solid fa-house"></i>
                <span>Home</span>
              </a>
            </li>
            <li>
              <a 
                href="#mattresses" 
                className="mobile-nav-link"
                onClick={() => scrollToSection('mattresses')}
              >
                <i className="fa-solid fa-bed"></i>
                <span>Mattresses</span>
              </a>
            </li>
            <li>
              <a 
                href="#technology" 
                className="mobile-nav-link"
                onClick={() => scrollToSection('technology')}
              >
                <i className="fa-solid fa-microchip"></i>
                <span>Technology</span>
              </a>
            </li>
            <li>
              <a 
                href="#testimonials" 
                className="mobile-nav-link"
                onClick={() => scrollToSection('testimonials')}
              >
                <i className="fa-solid fa-comments"></i>
                <span>Testimonials</span>
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                className="mobile-nav-link"
                onClick={() => scrollToSection('contact')}
              >
                <i className="fa-solid fa-envelope"></i>
                <span>Contact</span>
              </a>
            </li>
          </ul>
          
          <div className="mobile-menu-controls">
            <button className="theme-toggle-mobile" onClick={toggleTheme}>
              <i className={`fa-solid ${themeIcons[theme]}`}></i>
              <span>Toggle Theme</span>
            </button>
            <button className="cart-btn-mobile" onClick={toggleCart}>
              <i className="fa-solid fa-bag-shopping"></i>
              <span>Cart</span>
              <span className="cart-count-mobile">{totalItems}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;