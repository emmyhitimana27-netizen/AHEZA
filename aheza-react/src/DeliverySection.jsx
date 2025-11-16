import React from 'react';

const DeliverySection = () => {
  const steps = [
    {
      number: '1',
      title: 'Order Online',
      description: 'Choose your perfect mattress with our sleep quiz'
    },
    {
      number: '2',
      title: 'Free Delivery',
      description: 'We deliver to your door in 3-5 business days'
    },
    {
      number: '3',
      title: 'Easy Setup',
      description: 'Your mattress expands to full size in hours'
    }
  ];

  return (
    <section className="delivery-section">
      <div className="container">
        <div className="delivery-content">
          <div className="delivery-info" data-scroll>
            <h2>Easy Delivery & Setup</h2>
            <p>We make getting your new mattress simple and stress-free</p>
            <div className="delivery-steps">
              {steps.map((step, index) => (
                <div key={index} className="step">
                  <div className="step-number">{step.number}</div>
                  <div className="step-content">
                    <h4>{step.title}</h4>
                    <p>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="delivery-visual" data-scroll>
            <div className="delivery-image">
              <img src="images/ma.jpeg" alt="Mattress delivery" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliverySection;