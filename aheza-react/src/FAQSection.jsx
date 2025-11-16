import React, { useState } from 'react';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How long does it take to adjust to a new mattress?',
      answer: 'Most people adjust within 2-3 weeks. Your body needs time to adapt to the new support system, especially if you\'re transitioning from an old mattress.'
    },
    {
      question: 'Do you offer a trial period?',
      answer: 'Yes, we offer a 100-night risk-free trial. If you\'re not completely satisfied, we\'ll arrange pickup and provide a full refund.'
    },
    {
      question: 'What\'s the difference between memory foam and hybrid?',
      answer: 'Memory foam provides contouring support and motion isolation, while hybrid combines foam with springs for both comfort and responsive support.'
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="container">
        <div className="section-header">
          <h2>Frequently Asked Questions</h2>
          <p>Get answers to common questions about our mattresses</p>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`} data-scroll>
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                <h4>{faq.question}</h4>
                <span className="faq-toggle">+</span>
              </div>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;