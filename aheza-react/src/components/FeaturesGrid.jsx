import React from 'react';

const FeaturesGrid = () => {
  const features = [
    {
      icon: '🌡️',
      title: 'Temperature Regulation',
      description: 'Advanced cooling technology maintains perfect sleep temperature all night long'
    },
    {
      icon: '💪',
      title: 'Orthopedic Support',
      description: 'Perfect spinal alignment and pressure relief for restorative sleep'
    },
    {
      icon: '🌿',
      title: 'Eco-Friendly Materials',
      description: 'Sustainable, hypoallergenic materials for healthier sleep environment'
    },
    {
      icon: '🎯',
      title: '10-Year Warranty',
      description: 'Complete peace of mind with our comprehensive warranty coverage'
    }
  ];

  return (
    <section className="features-grid">
      <div className="container">
        <div className="section-header">
          <h2>Why Choose AHEZA 2050</h2>
          <p>Experience the difference with our innovative sleep solutions</p>
        </div>
        <div className="features">
          {features.map((feature, index) => (
            <div key={index} className="feature-card" data-scroll>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;