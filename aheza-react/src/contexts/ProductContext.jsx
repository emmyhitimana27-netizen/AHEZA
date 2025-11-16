import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Mock product data - in a real app, this would come from an API
  const mockProducts = [
    {
      id: 'premium-hybrid',
      name: 'Premium Hybrid Elite',
      description: 'Experience the perfect balance of foam comfort and spring support. Our Premium Hybrid Elite combines multiple layers of cooling gel memory foam with individually wrapped coils for targeted support and pressure relief.',
      price: 1299,
      image: 'images/matres 1.png',
      features: ['Cooling Gel Memory Foam', 'Individually Wrapped Coils', 'Zoned Support System', 'Eco-Friendly Materials'],
      specifications: {
        'Type': 'Hybrid',
        'Firmness': 'Medium (5-7)',
        'Height': '12 inches',
        'Trial': '100 Nights',
        'Warranty': '10 Years'
      },
      images: ['images/matres 1.png', 'images/matres 2.png', 'images/matres 3.png'],
      badge: 'BEST SELLER',
      rating: 4.8,
      reviewCount: 128
    },
    {
      id: 'luxury-memory',
      name: 'Luxury Memory Foam',
      description: 'Sink into cloud-like comfort with our advanced memory foam technology. The Luxury Memory Foam mattress adapts to your body shape, providing exceptional pressure relief and motion isolation for undisturbed sleep.',
      price: 999,
      image: 'images/matres 2.png',
      features: ['Advanced Memory Foam', 'Motion Isolation', 'Pressure Relief', 'Hypoallergenic'],
      specifications: {
        'Type': 'Memory Foam',
        'Firmness': 'Medium-Soft (4-6)',
        'Height': '10 inches',
        'Trial': '100 Nights',
        'Warranty': '15 Years'
      },
      images: ['images/matres 2.png', 'images/matres 1.png', 'images/matres 3.png'],
      badge: 'MOST COMFORTABLE',
      rating: 4.7,
      reviewCount: 95
    },
    {
      id: 'natural-latex',
      name: 'Natural Latex Supreme',
      description: 'Sleep naturally with our eco-friendly latex mattress. Made from sustainably sourced natural latex, this mattress offers responsive support, excellent durability, and natural cooling properties for a healthier sleep environment.',
      price: 1599,
      image: 'images/matres 3.png',
      features: ['100% Natural Latex', 'Responsive Support', 'Cooling Properties', 'Eco-Certified'],
      specifications: {
        'Type': 'Natural Latex',
        'Firmness': 'Medium-Firm (6-8)',
        'Height': '9 inches',
        'Trial': '100 Nights',
        'Warranty': '20 Years'
      },
      images: ['images/matres 3.png', 'images/matres 1.png', 'images/matres 2.png'],
      badge: 'ECO FRIENDLY',
      rating: 4.9,
      reviewCount: 87
    }
  ];

  useEffect(() => {
    // Simulate API call
    const loadProducts = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProducts(mockProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const getProductById = (id) => {
    return products.find(product => product.id === id);
  };

  const getProductsByCategory = (category) => {
    return products.filter(product => 
      product.specifications.Type.toLowerCase().includes(category.toLowerCase())
    );
  };

  const value = {
    products,
    loading,
    selectedProduct,
    setSelectedProduct,
    getProductById,
    getProductsByCategory
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};