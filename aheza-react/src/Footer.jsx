// components/Footer.jsx
import React, { useState, useEffect } from 'react';
import styles from '../src/Footer.module.css';

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
    <footer className={styles.mainFooter} id="contact">
      <div className="container">
        {/* Newsletter Section */}
        <section className={styles.newsletterSection}>
          <div className={styles.newsletterContent}>
            <div className={styles.newsletterText}>
              <h3 data-translate="newsletterTitle">Stay in the Loop</h3>
              <p data-translate="newsletterDesc">
                Get exclusive offers and sleep tips delivered to your inbox.
              </p>
              <p className={styles.newsletterNote}>
                No spam. Unsubscribe anytime.
              </p>
            </div>
            <div className={styles.newsletterForm}>
              <form className={styles.formGroup}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={styles.newsletterInput}
                  required
                />
                <button type="submit" className={styles.newsletterBtn}>
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Main Footer */}
        <div className={styles.footerMain}>
          <div className={styles.footerGrid}>
            {/* Brand Column */}
            <div className={`${styles.footerColumn} ${styles.brandColumn}`}>
              <div className={styles.footerLogo}>
                <div className={styles.logoIcon}>Moon</div>
                <div className={styles.logoText}>
                  <h2>AHEZA 2050</h2>
                  <span className={styles.logoTagline}>Sleep Revolution</span>
                </div>
              </div>
              <p className={styles.footerDescription} data-translate="footerDesc">
                Transforming sleep experiences with premium mattresses and innovative technology.
              </p>
              <div className={styles.socialLinks}>
                <a href="#" className={styles.socialLink} aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className={styles.socialLink} aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className={styles.socialLink} aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className={styles.socialLink} aria-label="Pinterest">
                  <i className="fab fa-pinterest"></i>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className={styles.footerColumn}>
              <h4 data-translate="quickLinks">Quick Links</h4>
              <ul className={styles.footerLinks}>
                <li><a href="#home" className={styles.footerLink}>Home</a></li>
                <li><a href="#mattresses" className={styles.footerLink}>Mattresses</a></li>
                <li><a href="#technology" className={styles.footerLink}>Technology</a></li>
                <li><a href="#testimonials" className={styles.footerLink}>Testimonials</a></li>
              </ul>
            </div>

            {/* Support */}
            <div className={styles.footerColumn}>
              <h4 data-translate="supportLinks">Support</h4>
              <ul className={styles.footerLinks}>
                <li><a href="#" className={styles.footerLink} data-translate="shippingInfo">Shipping Info</a></li>
                <li><a href="#" className={styles.footerLink} data-translate="returns">Returns</a></li>
                <li><a href="#" className={styles.footerLink} data-translate="warranty">Warranty</a></li>
                <li><a href="#contact" className={styles.footerLink} data-translate="contactUs">Contact Us</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div className={styles.footerColumn}>
              <h4 data-translate="contact">Contact</h4>
              <div className={styles.contactInfo}>
                <div className={styles.contactItem}>
                  <i className="fa-solid fa-envelope"></i>
                  <span>hello@aheza2050.com</span>
                </div>
                <div className={styles.contactItem}>
                  <i className="fa-solid fa-phone"></i>
                  <span>+250 788 123 456</span>
                </div>
                <div className={styles.contactItem}>
                  <i className="fa-solid fa-location-dot"></i>
                  <span>Kigali, Rwanda</span>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className={`${styles.footerColumn} ${styles.trustBadges}`}>
              <h4>Trusted By</h4>
              <div className={styles.badgesGrid}>
                <div className={styles.trustBadge}>
                  <i className="fa-solid fa-shield-alt"></i>
                  <span>Secure Checkout</span>
                </div>
                <div className={styles.trustBadge}>
                  <i className="fa-solid fa-truck"></i>
                  <span>Free Delivery</span>
                </div>
                <div className={styles.trustBadge}>
                  <i className="fa-solid fa-medal"></i>
                  <span>10-Year Warranty</span>
                </div>
                <div className={styles.trustBadge}>
                  <i className="fa-solid fa-headset"></i>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={styles.footerBottom}>
          <div className={styles.footerBottomContent}>
            <div className={styles.copyright}>
              <p>© 2025 AHEZA 2050. <span data-translate="rights">All rights reserved.</span></p>
            </div>
            <div className={styles.footerBottomLinks}>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>

        {/* Scroll to Top */}
        <button
          className={`${styles.scrollToTop} ${showScrollTop ? styles.visible : ''}`}
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <i className="fa-solid fa-angle-up"></i>
        </button>
      </div>
    </footer>
  );
};

export default Footer;