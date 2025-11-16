import React from 'react';

const SleepBenefits = () => {
  const benefits = [
    {
      icon: '🧠',
      title: 'Enhanced Cognitive Function',
      description: 'Better sleep improves memory, focus, and problem-solving abilities'
    },
    {
      icon: '❤️',
      title: 'Improved Heart Health',
      description: 'Quality sleep reduces stress on your cardiovascular system'
    },
    {
      icon: '💪',
      title: 'Better Physical Recovery',
      description: 'Your body repairs itself more effectively during deep sleep'
    },
    {
      icon: '😊',
      title: 'Enhanced Mood',
      description: 'Well-rested people experience less stress and better emotional regulation'
    }
  ];

  return (
    <section className="sleep-benefits">
      <div className="container">
        <div className="section-header">
          <h2>Benefits of Quality Sleep</h2>
          <p>Investing in a quality mattress improves more than just your sleep</p>
        </div>
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-card" data-scroll>
              <div className="benefit-icon">{benefit.icon}</div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SleepBenefits;