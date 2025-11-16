import React from 'react';

const CTASection = () => {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-content" data-scroll>
          <h2>Ready to Transform Your Sleep?</h2>
          <p>Experience the AHEZA 2050 difference with our 100-night risk-free trial</p>
          <div className="cta-buttons">
            <a href="#mattresses" className="cta-button primary">Shop Mattresses</a>
            <a href="#contact" className="cta-button secondary">Get Expert Advice</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;