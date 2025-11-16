import React from 'react';

const MattressCategories = () => {
  const categories = [
    {
      icon: '🛏️',
      title: 'Memory Foam',
      description: 'Contouring support that adapts to your body shape for pressure relief',
      features: ['Pressure point relief', 'Motion isolation', 'Body contouring']
    },
    {
      icon: '🔄',
      title: 'Hybrid',
      description: 'Combining foam comfort with spring support for the best of both worlds',
      features: ['Balanced support', 'Enhanced airflow', 'Responsive feel']
    },
    {
      icon: '🌿',
      title: 'Natural Latex',
      description: 'Eco-friendly responsive support with natural cooling properties',
      features: ['Natural materials', 'Cool sleeping surface', 'Durable construction']
    }
  ];

  return (
    <section className="mattress-categories">
      <div className="container">
        <div className="section-header">
          <h2>Our Mattress Categories</h2>
          <p>Find the perfect mattress type for your sleep needs</p>
        </div>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <div key={index} className="category-card" data-scroll>
              <div className="category-icon">{category.icon}</div>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              <ul>
                {category.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <a href="#mattresses" className="cta-button secondary">Explore</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MattressCategories;