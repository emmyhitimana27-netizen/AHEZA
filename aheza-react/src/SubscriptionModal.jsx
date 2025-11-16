import React, { useState, useEffect } from 'react';
import { useApp } from './contexts/AppContext';

const SubscriptionModal = () => {
  const { addToast } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!sessionStorage.getItem('subscriptionShown')) {
        setIsOpen(true);
        sessionStorage.setItem('subscriptionShown', 'true');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      addToast({ 
        message: 'Thank you for subscribing!', 
        type: 'success', 
        autoHide: true 
      });
      setEmail('');
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div id="subscribe-modal" className="modal subscription-modal active">
      <div className="modal-content">
        <button className="close-modal" onClick={() => setIsOpen(false)}>
          &times;
        </button>
        <div className="subscription-content">
          <div className="subscription-icon">🌙</div>
          <h3>Join Our Sleep Revolution</h3>
          <p>Get exclusive deals and sleep tips delivered to your inbox</p>
          <form className="subscription-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Subscribe</button>
          </form>
          <p className="subscription-note">No spam, just better sleep</p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;