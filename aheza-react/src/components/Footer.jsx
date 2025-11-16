import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="main-footer" id="contact">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="logo">
              <div className="logo-icon">🌙</div>
              <div className="logo-text">
                <span className="logo-main">AHEZA 2050</span>
                <span className="logo-sub">Sleep Revolution</span>
              </div>
            </div>
            <p data-translate="footerDesc">
              Transforming sleep experiences with premium mattresses and innovative technology.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" aria-label="Pinterest">
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4 data-translate="quickLinks">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#mattresses">Mattresses</a></li>
              <li><a href="#technology">Technology</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 data-translate="supportLinks">Support</h4>
            <ul className="footer-links">
              <li><a href="#" data-translate="shippingInfo">Shipping Info</a></li>
              <li><a href="#" data-translate="returns">Returns</a></li>
              <li><a href="#" data-translate="warranty">Warranty</a></li>
              <li><a href="#contact" data-translate="contactUs">Contact Us</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 data-translate="contact">Contact</h4>
            <div className="contact-info">
              <p>
                <i className="fa-solid fa-envelope"></i>
                hello@aheza2050.com
              </p>
              <p>
                <i className="fa-solid fa-phone"></i>
                +250 788 123 456
              </p>
              <p>
                <i className="fa-solid fa-location-dot"></i>
                Kigali, Rwanda
              </p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 AHEZA 2050. <span data-translate="rights">All rights reserved.</span></p>
          <button 
            className={`scroll-to-top ${showScrollTop ? 'visible' : ''}`}
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <i className="fa-solid fa-angle-up"></i>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;