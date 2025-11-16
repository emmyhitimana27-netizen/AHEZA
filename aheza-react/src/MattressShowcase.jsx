import React, { useState } from 'react';
import { useProduct } from './contexts/ProductContext'; 
import { useApp } from './contexts/AppContext';
import { useScrollAnimation } from './hooks/useScrollAnimation';

const MattressShowcase = () => {
  const { products, loading, setSelectedProduct } = useProduct();
  const { cartManager, languageManager } = useApp();
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  useScrollAnimation();

  const toggleDescription = (productId) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    cartManager.addToCart(product);
  };

  const handleQuickView = (product, e) => {
    e.stopPropagation();
    setSelectedProduct(product);
    // Open product modal would be handled by the modal context
    document.getElementById('product-modal')?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star full">★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
    }

    return stars;
  };

  if (loading) {
    return (
      <section id="mattresses" className="mattress-showcase">
        <div className="container">
          <div className="section-header">
            <h2 data-translate="collectionTitle">Premium Mattress Collection</h2>
            <p data-translate="collectionDesc">Discover our handcrafted mattresses designed for ultimate comfort</p>
          </div>
          <div className="loading-grid">
            {[1, 2, 3].map(item => (
              <div key={item} className="mattress-card loading">
                <div className="mattress-image loading-skeleton"></div>
                <div className="mattress-content">
                  <div className="mattress-title loading-skeleton"></div>
                  <div className="mattress-description loading-skeleton"></div>
                  <div className="mattress-description loading-skeleton short"></div>
                  <div className="mattress-rating loading-skeleton"></div>
                  <div className="mattress-features loading-skeleton"></div>
                  <div className="mattress-price loading-skeleton"></div>
                  <div className="mattress-actions">
                    <div className="cta-button primary loading-skeleton"></div>
                    <div className="cta-button secondary loading-skeleton"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="mattresses" className="mattress-showcase">
      <div className="container">
        <div className="section-header">
          <h2 data-translate="collectionTitle">Premium Mattress Collection</h2>
          <p data-translate="collectionDesc">Discover our handcrafted mattresses designed for ultimate comfort</p>
        </div>
        
        <div className="mattress-grid">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="mattress-card" 
              data-scroll 
              data-product-id={product.id}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div 
                className="mattress-image" 
                style={{ backgroundImage: `url('${product.image}')` }}
                onClick={() => handleQuickView(product, { stopPropagation: () => {} })}
              >
                {product.badge && (
                  <div className="mattress-badge">{product.badge}</div>
                )}
              </div>
              <div className="mattress-content">
                <h3 className="mattress-title">{product.name}</h3>
                <p className={`mattress-description ${expandedDescriptions[product.id] ? 'expanded' : ''}`}>
                  {product.description}
                </p>
                <button 
                  className="read-more-toggle"
                  onClick={() => toggleDescription(product.id)}
                >
                  {expandedDescriptions[product.id] ? 'Read Less' : 'Read More'}
                </button>
                <div className="mattress-rating">
                  <span className="rating-stars">
                    {renderStars(product.rating)}
                  </span>
                  <span className="rating-count">({product.reviewCount} reviews)</span>
                </div>
                <div className="mattress-features">
                  {product.features.slice(0, 2).map((feature, idx) => (
                    <span key={idx} className="feature-tag">{feature}</span>
                  ))}
                </div>
                <div className="mattress-price">${product.price}</div>
                <div className="mattress-actions">
                  <button 
                    className="cta-button primary add-to-cart-btn"
                    onClick={(e) => handleAddToCart(product, e)}
                  >
                    Add to Cart
                  </button>
                  <button 
                    className="cta-button secondary quick-view-btn"
                    onClick={(e) => handleQuickView(product, e)}
                  >
                    Quick View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="show-more-container">
          <a href="/products" className="show-more-btn">
            <span data-translate="viewAll">View All Mattresses</span>
            <i className="fa-solid fa-arrow-right-long"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default MattressShowcase;