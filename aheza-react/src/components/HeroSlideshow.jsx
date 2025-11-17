import React, { useState, useEffect } from 'react';

const HeroSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1617042692494-71e57a4f8c7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
      title: 'Welcome to AHEZA 2050',
      description: 'Discover the perfect balance of comfort and support with our premium mattress collection',
      cta: 'Explore Collection',
      link: '#mattresses'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1595577338638-5487a524e937?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
      title: 'Advanced Sleep Technology',
      description: 'Innovative materials and design for the most restorative sleep of your life',
      cta: 'Learn More',
      link: '#technology'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
      title: 'Luxury Comfort Redefined',
      description: 'Handcrafted mattresses that adapt to your body for unparalleled comfort',
      cta: 'Shop Now',
      link: '#mattresses'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section id="home" className="hero-slideshow">
      <div className="slideshow-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
          >
            <div 
              className="slide-image" 
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <img src={slide.image} alt={`Hero ${index + 1}`} loading="lazy" aria-hidden="true" />
            </div>
            <div className="slide-content">
              <h1 className="slide-title">{slide.title}</h1>
              <p className="slide-description">{slide.description}</p>
              <a href={slide.link} className="cta-button">{slide.cta}</a>
            </div>
          </div>
        ))}
      </div>

      <div className="slideshow-controls">
        <button className="slide-prev" onClick={prevSlide}>
          <i className="fa-solid fa-angle-left"></i>
        </button>
        <div className="slide-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
        <button className="slide-next" onClick={nextSlide}>
          <i className="fa-solid fa-angle-right"></i>
        </button>
      </div>

      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlideshow;