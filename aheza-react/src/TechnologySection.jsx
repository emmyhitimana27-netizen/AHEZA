import React from 'react';
import { useScrollAnimation } from './hooks/useScrollAnimation';

const TechnologySection = () => {
  useScrollAnimation();

  return (
    <section id="technology" className="technology-section">
      <div className="container">
        <div className="tech-content">
          <div className="tech-info" data-scroll>
            <h2 data-translate="technologyTitle">Advanced Sleep Technology</h2>
            <p data-translate="technologyDesc">Our mattresses incorporate cutting-edge technology to provide the most comfortable and supportive sleep surface available.</p>
            <ul className="tech-features">
              <li>
                <i className="fa-solid fa-circle-check"></i>
                <span data-translate="multiLayer">Multi-layer memory foam construction</span>
              </li>
              <li>
                <i className="fa-solid fa-circle-check"></i>
                <span data-translate="coolingGel">Active cooling gel infusion</span>
              </li>
              <li>
                <i className="fa-solid fa-circle-check"></i>
                <span data-translate="zonedSupport">Zoned support system</span>
              </li>
              <li>
                <i className="fa-solid fa-circle-check"></i>
                <span data-translate="naturalLatexLayer">Natural latex comfort layers</span>
              </li>
            </ul>
          </div>
          <div className="tech-visual" data-scroll>
            <div className="tech-animation">
              <div className="mattress-layers">
                <div className="layer cooling" data-translate="coolingGel">Cooling Gel</div>
                <div className="layer memory" data-translate="memoryFoam">Memory Foam</div>
                <div className="layer support" data-translate="supportCore">Support Core</div>
                <div className="layer base" data-translate="durableBase">Durable Base</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;