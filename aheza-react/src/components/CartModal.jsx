import React from 'react';
import { useApp } from '../contexts/AppContext';

const CartModal = () => {
  const {
    cart,
    isCartOpen,
    updateQuantity,
    removeFromCart,
    toggleCart,
    addToast
  } = useApp();

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 0 : 0;
  const total = subtotal + shipping;

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      addToast({ message: 'Item removed from cart', type: 'warning', autoHide: true });
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      addToast({ message: 'Your cart is empty', type: 'error', autoHide: true });
      return;
    }
    addToast({ message: 'Proceeding to checkout...', type: 'info', autoHide: true });
  };

  return (
    <div id="cart-modal" className="modal cart-modal active">
      <div className="modal-content">
        <button className="close-modal" onClick={toggleCart}>&times;</button>
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <span className="cart-items-count">({cart.length} items)</span>
        </div>
        
        <div className="cart-body">
          {cart.length === 0 ? (
            <div id="empty-cart" className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <h3>Your cart is empty</h3>
              <p>Start adding some comfortable mattresses to your cart!</p>
              <button className="cta-button primary" onClick={toggleCart}>
                <span>Shop Mattresses</span>
              </button>
            </div>
          ) : (
            <>
              <div id="cart-items" className="cart-items">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item" data-id={item.id}>
                    <div className="cart-item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="cart-item-details">
                      <h3 className="cart-item-name">{item.name}</h3>
                      <div className="cart-item-features">
                        {item.features?.slice(0, 2).map((feature, index) => (
                          <span key={index} className="cart-item-feature">{feature}</span>
                        ))}
                      </div>
                      <div className="cart-item-price">${(item.price || 0).toFixed(2)}</div>
                      <div className="cart-item-controls">
                        <div className="quantity-controls">
                          <button 
                            className="quantity-btn decrease"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          >
                            <i className="fa-solid fa-minus"></i>
                          </button>
                          <span className="quantity-display">{item.quantity}</span>
                          <button 
                            className="quantity-btn increase"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>
                        </div>
                        <button 
                          className="remove-item"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <i className="fa-solid fa-trash"></i>
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="cart-item-total">
                      ${((item.price || 0) * (item.quantity || 0)).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="cart-footer">
                <div className="cart-summary">
                  <div className="cart-total">
                    <span>Subtotal</span>
                    <span className="total-amount" id="cart-subtotal">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="cart-shipping">
                    <span>Shipping</span>
                    <span className="shipping-amount">FREE</span>
                  </div>
                  <div className="cart-grand-total">
                    <span>Total</span>
                    <span className="grand-total-amount" id="cart-grand-total">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <div className="cart-actions">
                  <button className="cta-button secondary" onClick={toggleCart}>
                    Continue Shopping
                  </button>
                  <button className="cta-button primary" onClick={handleCheckout}>
                    Proceed to Checkout
                  </button>
                </div>
                
                <div className="cart-security">
                  <div className="security-badges">
                    <div className="security-badge">
                      <i className="fa-solid fa-shield-check"></i>
                      <span>Secure Checkout</span>
                    </div>
                    <div className="security-badge">
                      <i className="fa-solid fa-lock"></i>
                      <span>SSL Encrypted</span>
                    </div>
                    <div className="security-badge">
                      <i className="fa-solid fa-credit-card"></i>
                      <span>Multiple Payment Options</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;