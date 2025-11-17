import React, { useState, useMemo } from 'react';
import { useProduct } from './contexts/ProductContext'; 
import { useApp } from './contexts/AppContext';
import { useScrollAnimation } from './hooks/useScrollAnimation';

const MattressShowcase = () => {
  const { products, loading, setSelectedProduct } = useProduct();
  const { cartManager, languageManager, wishlistManager } = useApp();
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [sortBy, setSortBy] = useState('featured');
  const [filterBy, setFilterBy] = useState('all');
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
    document.getElementById('product-modal')?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const handleWishlistToggle = (product, e) => {
    e.stopPropagation();
    if (wishlistManager.isInWishlist(product.id)) {
      wishlistManager.removeFromWishlist(product.id);
    } else {
      wishlistManager.addToWishlist(product);
    }
  };

  // Removed showFeedback function as we're using the AppContext toast system

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

  const filteredAndSortedProducts = useMemo(() => {
    if (!products || !Array.isArray(products)) return [];
    
    let filtered = [...products];
    
    // Filter products
    if (filterBy !== 'all') {
      filtered = filtered.filter(product => 
        product?.category === filterBy || product?.features?.includes(filterBy)
      );
    }
    
    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (a?.price || 0) - (b?.price || 0));
        break;
      case 'price-high':
        filtered.sort((a, b) => (b?.price || 0) - (a?.price || 0));
        break;
      case 'rating':
        filtered.sort((a, b) => (b?.rating || 0) - (a?.rating || 0));
        break;
      case 'name':
        filtered.sort((a, b) => (a?.name || '').localeCompare(b?.name || ''));
        break;
      default:
        // featured - maintain original order
        break;
    }
    
    return filtered;
  }, [products, sortBy, filterBy]);

  const categories = useMemo(() => {
    if (!products || !Array.isArray(products)) return ['all'];
    
    const allCategories = new Set(['all']);
    
    products.forEach(product => {
      // Add category if it exists
      if (product?.category && typeof product.category === 'string') {
        allCategories.add(product.category);
      }
      
      // Add features if they exist
      if (Array.isArray(product?.features)) {
        product.features.forEach(feature => {
          if (feature && typeof feature === 'string') {
            allCategories.add(feature);
          }
        });
      }
    });
    
    return Array.from(allCategories).slice(0, 6); // Limit to 6 categories for UI
  }, [products]);

  // Safe category name formatter
  const formatCategoryName = (category) => {
    if (!category || typeof category !== 'string') return 'All';
    return category.charAt(0).toUpperCase() + category.slice(1);
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
            {[1, 2, 3, 4].map(item => (
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

        {/* Filters and Sorting */}
        <div className="controls-panel">
          <div className="filter-controls">
            <label>Filter by:</label>
            <select 
              value={filterBy} 
              onChange={(e) => setFilterBy(e.target.value)}
              className="filter-select"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {formatCategoryName(category)}
                </option>
              ))}
            </select>
          </div>
          
          <div className="sort-controls">
            <label>Sort by:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="results-count">
          Showing {filteredAndSortedProducts.length} of {products?.length || 0} products
        </div>
        
        <div className="mattress-grid">
          {filteredAndSortedProducts.map((product, index) => (
            <div 
              key={product?.id || index} 
              className={`mattress-card ${hoveredProduct === product?.id ? 'hovered' : ''}`}
              data-scroll 
              data-product-id={product?.id}
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredProduct(product?.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="card-header">
                <div 
                  className="mattress-image" 
                  style={{ backgroundImage: `url('${product?.image || ''}')` }}
                  onClick={() => product && handleQuickView(product, { stopPropagation: () => {} })}
                >
                  {product?.badge && (
                    <div className={`mattress-badge ${product.badge.toLowerCase().includes('sale') ? 'sale' : ''}`}>
                      {product.badge}
                    </div>
                  )}
                  
                  {/* Wishlist Button */}
                  <button 
                    className={`wishlist-btn ${wishlistManager.isInWishlist(product?.id) ? 'in-wishlist' : ''}`}
                    onClick={(e) => product && handleWishlistToggle(product, e)}
                    aria-label={wishlistManager.isInWishlist(product?.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <i className={`fa-heart ${wishlistManager.isInWishlist(product?.id) ? 'fa-solid' : 'fa-regular'}`}></i>
                  </button>

                  {/* Quick View Overlay */}
                  <div className="image-overlay">
                    <button 
                      className="quick-view-overlay-btn"
                      onClick={(e) => product && handleQuickView(product, e)}
                    >
                      <i className="fa-solid fa-eye"></i>
                      Quick View
                    </button>
                  </div>
                </div>
              </div>

              <div className="mattress-content">
                <div className="content-header">
                  <h3 className="mattress-title">{product?.name || 'Unnamed Product'}</h3>
                  <div className="mattress-rating">
                    <span className="rating-stars">
                      {renderStars(product?.rating || 0)}
                    </span>
                    <span className="rating-value">{product?.rating || 0}</span>
                    <span className="rating-count">({product?.reviewCount || 0})</span>
                  </div>
                </div>

                <p className={`mattress-description ${expandedDescriptions[product?.id] ? 'expanded' : ''}`}>
                  {product?.description || 'No description available.'}
                </p>
                
                {product?.description && (
                  <button 
                    className="read-more-toggle"
                    onClick={() => product?.id && toggleDescription(product.id)}
                  >
                    {expandedDescriptions[product?.id] ? 
                      <><span>Read Less</span> <i className="fa-solid fa-chevron-up"></i></> : 
                      <><span>Read More</span> <i className="fa-solid fa-chevron-down"></i></>
                    }
                  </button>
                )}

                <div className="mattress-features">
                  {product?.features?.slice(0, 3).map((feature, idx) => (
                    <span key={idx} className="feature-tag">
                      <i className="fa-solid fa-check"></i>
                      {feature}
                    </span>
                  )) || []}
                  {product?.features && product.features.length > 3 && (
                    <span className="feature-tag more">+{product.features.length - 3} more</span>
                  )}
                </div>

                <div className="price-section">
                  {product?.originalPrice && (
                    <span className="original-price">${product.originalPrice}</span>
                  )}
                  <span className="mattress-price">${product?.price || 0}</span>
                  {product?.originalPrice && product?.price && (
                    <span className="discount-badge">
                      Save ${product.originalPrice - product.price}
                    </span>
                  )}
                </div>

                <div className="mattress-actions">
                  <button 
                    className="cta-button primary add-to-cart-btn"
                    onClick={(e) => product && handleAddToCart(product, e)}
                    disabled={!product}
                  >
                    <i className="fa-solid fa-cart-plus"></i>
                    Add to Cart
                  </button>
                  <button 
                    className="cta-button secondary quick-view-btn"
                    onClick={(e) => product && handleQuickView(product, e)}
                    disabled={!product}
                  >
                    <i className="fa-solid fa-eye"></i>
                    Quick View
                  </button>
                </div>

                {/* Additional Info */}
                <div className="product-meta">
                  <div className="meta-item">
                    <i className="fa-solid fa-truck"></i>
                    <span>Free Shipping</span>
                  </div>
                  <div className="meta-item">
                    <i className="fa-solid fa-moon"></i>
                    <span>100 Night Trial</span>
                  </div>
                  <div className="meta-item">
                    <i className="fa-solid fa-award"></i>
                    <span>10 Year Warranty</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAndSortedProducts.length === 0 && (
          <div className="no-products">
            <i className="fa-solid fa-bed empty-icon"></i>
            <h3>No products found</h3>
            <p>Try adjusting your filters to see more results</p>
            <button 
              className="cta-button primary"
              onClick={() => setFilterBy('all')}
            >
              Clear Filters
            </button>
          </div>
        )}

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