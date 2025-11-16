import React, { useState, useEffect } from 'react';
import { testimonials } from './data/testimonials';

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!testimonials || testimonials.length === 0) return;

    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length);
      }, 6000);
    }

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Add pause on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  if (!testimonials || testimonials.length === 0) {
    return (
      <section id="testimonials" className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>What Our Customers Say</h2>
            <p>No testimonials available at the moment</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <h2>What Our Customers Say</h2>
          <p>Join thousands of satisfied sleepers</p>
        </div>
        
        <div 
          className="testimonials-slider"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="testimonials-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className={`testimonial-slide ${index === currentSlide ? 'active' : ''}`}>
                <div className="testimonial-quote">
                  "{testimonial.quote}"
                </div>
                <div className="testimonial-author">{testimonial.author}</div>
                <div className="testimonial-role">{testimonial.role}</div>
                <div className="testimonial-rating">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fa-solid fa-star"></i>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="testimonial-controls">
            <button className="testimonial-prev" onClick={prevSlide} aria-label="Previous testimonial">
              <i className="fa-solid fa-angle-left"></i>
            </button>
            
            <div className="testimonial-indicators">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`testimonial-indicator ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button className="testimonial-next" onClick={nextSlide} aria-label="Next testimonial">
              <i className="fa-solid fa-angle-right"></i>
            </button>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default TestimonialsSection;