import React, { useState } from 'react';
import { products } from './data/products';

const SleepCalculator = () => {
  const [sleepPosition, setSleepPosition] = useState('back');
  const [firmness, setFirmness] = useState('medium');
  const [recommendation, setRecommendation] = useState(null);

  const calculateRecommendation = () => {
    let recommendedProduct = products[0]; // Default: Premium Hybrid Elite
    let description = 'Perfect all-around mattress for most sleepers';

    if (sleepPosition === 'side' && firmness === 'soft') {
      recommendedProduct = products[1]; // Luxury Memory Foam
      description = 'Excellent pressure relief for side sleepers';
    } else if (sleepPosition === 'back' && firmness === 'medium') {
      recommendedProduct = products[0]; // Premium Hybrid Elite
      description = 'Balanced support for back sleepers';
    } else if (sleepPosition === 'stomach' && firmness === 'firm') {
      recommendedProduct = products[2]; // Natural Latex Supreme
      description = 'Firm support for proper spinal alignment';
    } else if (firmness === 'soft') {
      recommendedProduct = products[1]; // Luxury Memory Foam
      description = 'Cloud-like comfort with excellent pressure relief';
    } else if (firmness === 'firm') {
      recommendedProduct = products[2]; // Natural Latex Supreme
      description = 'Responsive support with natural cooling';
    }

    setRecommendation({ product: recommendedProduct, description });
  };

  return (
    <section className="sleep-calculator">
      <div className="container">
        <div className="calculator-content">
          <div className="calculator-info" data-scroll>
            <h2>Find Your Perfect Mattress</h2>
            <p>Answer a few questions and our smart calculator will recommend the ideal mattress for your sleep style</p>
            <div className="calculator-form">
              <div className="form-group">
                <label htmlFor="sleep-position">Primary Sleep Position</label>
                <select 
                  id="sleep-position" 
                  value={sleepPosition}
                  onChange={(e) => setSleepPosition(e.target.value)}
                >
                  <option value="back">Back Sleeper</option>
                  <option value="side">Side Sleeper</option>
                  <option value="stomach">Stomach Sleeper</option>
                  <option value="combination">Combination</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="firmness-preference">Firmness Preference</label>
                <select 
                  id="firmness-preference"
                  value={firmness}
                  onChange={(e) => setFirmness(e.target.value)}
                >
                  <option value="soft">Soft</option>
                  <option value="medium">Medium</option>
                  <option value="firm">Firm</option>
                </select>
              </div>
              <button className="cta-button" onClick={calculateRecommendation}>
                Find My Mattress
              </button>
            </div>
          </div>
          <div className="calculator-visual" data-scroll>
            <div className="recommendation-card">
              <div 
                className="mattress-image" 
                style={{ 
                  backgroundImage: `url(${recommendation?.product?.image || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'})` 
                }}
              ></div>
              <h3>{recommendation ? recommendation.product.name : 'Your Perfect Match'}</h3>
              <p>{recommendation ? recommendation.description : 'Complete the form to see your personalized mattress recommendation'}</p>
              {recommendation && (
                <button className="cta-button primary">
                  View Details
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SleepCalculator;