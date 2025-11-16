import { useEffect, useRef } from 'react';

export const useScrollAnimation = () => {
  const observerRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

     const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Handle counting animations for stats
          if (entry.target.classList.contains('stat-number')) {
            animateCounter(entry.target);
          }
        }
      });
    }, observerOptions);

    // Observe all elements with data-scroll attribute
    document.querySelectorAll('[data-scroll]').forEach(el => {
      observerRef.current.observe(el);
    });

    // Observe stats numbers separately
    document.querySelectorAll('.stat-number').forEach(el => {
      observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);


  return null;
};