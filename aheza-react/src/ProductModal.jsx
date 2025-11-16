import React from 'react';
import { useApp } from './contexts/AppContext';

const ProductModal = () => {
  const { isProductModalOpen, selectedProduct, closeProductModal, addToCart } = useApp();

  if (!isProductModalOpen || !selectedProduct) return null;

  const handleAddToCart = () => {
    addToCart(selectedProduct);
    closeProductModal();
  };

  return (
    <div className="modal product-modal active">
      <div className="modal-content">
        <button className="close-modal" onClick={closeProductModal}>&times;</button>
        
        <div className="product-modal-container">
          <div className="product-modal-image">
            <img src={selectedProduct.image} alt={selectedProduct.name} />
          </div>
          
          <div className="product-modal-info">
            <h2>{selectedProduct.name}</h2>
            <div className="product-price">${selectedProduct.price.toFixed(2)}</div>
            
            <div className="product-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className={`fa-solid fa-star ${i < selectedProduct.rating ? 'active' : ''}`}></i>
                ))}
              </div>
              <span className="rating-text">{selectedProduct.rating} ({selectedProduct.reviews} reviews)</span>
            </div>
            
            <div className="product-description">
              <p>{selectedProduct.description}</p>
            </div>
            
            <div className="product-features">
              <h3>Key Features</h3>
              <ul>
                {selectedProduct.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            
            <div className="product-sizes">
              <h3>Available Sizes</h3>
              <div className="size-options">
                {selectedProduct.sizes.map((size, index) => (
                  <button key={index} className="size-option">
                    {size.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="product-actions">
              <button className="cta-button primary" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button className="cta-button secondary" onClick={closeProductModal}>
                Continue Shopping
              </button>
            </div>
            
            <div className="product-warranty">
              <div className="warranty-item">
                <i className="fa-solid fa-truck"></i>
                <span>Free Delivery</span>
              </div>
              <div className="warranty-item">
                <i className="fa-solid fa-undo"></i>
                <span>100-Night Trial</span>
              </div>
              <div className="warranty-item">
                <i className="fa-solid fa-shield-halved"></i>
                <span>10-Year Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;