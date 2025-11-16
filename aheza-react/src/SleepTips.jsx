import React, { useState } from 'react';

const SleepTips = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const sleepTips = [

    {
      id: 15,
      icon: '📊',
      title: 'Sleep Tracking',
      description: 'Use sleep trackers to understand your patterns, but avoid becoming obsessed with the data.',
      category: 'technology',
      duration: 'As needed',
      expert: 'Sleep Science and Practice'
    },
    {
      id: 16,
      icon: '🌅',
      title: 'Natural Wake-up',
      description: 'Use sunrise simulation alarms that gradually increase light, mimicking natural dawn for gentler waking.',
      category: 'environment',
      duration: 'Morning',
      expert: 'Journal of Sleep Research'
    },
    {
      id: 17,
      icon: '🛀',
      title: 'Warm Bath',
      description: 'Take a warm bath 1-2 hours before bed. The temperature drop afterward signals sleepiness to your body.',
      category: 'routine',
      duration: '1-2 hours before bed',
      expert: 'Sleep Medicine Reviews'
    },
    {
      id: 18,
      icon: '📚',
      title: 'Physical Books',
      description: 'Read physical books instead of e-books before bed. The lack of blue light and mental engagement promotes sleep.',
      category: 'routine',
      duration: '30 minutes',
      expert: 'Proceedings of the National Academy of Sciences'
    },
    {
      id: 19,
      icon: '🧴',
      title: 'Comfort Optimization',
      description: 'Invest in quality pillows and bedding that support your sleep position and temperature preferences.',
      category: 'environment',
      duration: 'Ongoing',
      expert: 'Sleep Health Journal'
    },
    {
      id: 20,
      icon: '🌅',
      title: 'Progressive Relaxation',
      description: 'Practice tensing and relaxing each muscle group from toes to head. This reduces physical tension and anxiety.',
      category: 'mental',
      duration: '10-15 minutes',
      expert: 'Journal of Behavioral Medicine'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Tips', count: sleepTips.length },
    { id: 'routine', name: 'Bedtime Routine', count: sleepTips.filter(tip => tip.category === 'routine').length },
    { id: 'environment', name: 'Sleep Environment', count: sleepTips.filter(tip => tip.category === 'environment').length },
    { id: 'nutrition', name: 'Nutrition', count: sleepTips.filter(tip => tip.category === 'nutrition').length },
    { id: 'mental', name: 'Mental Health', count: sleepTips.filter(tip => tip.category === 'mental').length },
    { id: 'lifestyle', name: 'Lifestyle', count: sleepTips.filter(tip => tip.category === 'lifestyle').length },
    { id: 'technology', name: 'Technology', count: sleepTips.filter(tip => tip.category === 'technology').length }
  ];

  const filteredTips = activeCategory === 'all' 
    ? sleepTips 
    : sleepTips.filter(tip => tip.category === activeCategory);

  return (
    <section id="sleep-tips" className="sleep-tips">
      <div className="container">
        <div className="section-header">
          <h2>Sleep Health Tips</h2>
          <p>Expert advice for better sleep every night</p>
        </div>

        {/* Category Filters */}
        <div className="tips-categories">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-filter ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
              <span className="tip-count">&nbsp;({category.count})</span>
            </button>
          ))}
        </div>

        {/* Tips Grid */}
        <div className="tips-grid">
          {filteredTips.map((tip) => (
            <div key={tip.id} className="tip-card" data-scroll>
              <div className="tip-header">
                <div className="tip-icon">{tip.icon}</div>
                <div className="tip-meta">
                  <span className="tip-duration">{tip.duration}</span>
                  <span className="tip-category">{tip.category}</span>
                </div>
              </div>
              <h3>{tip.title}</h3>
              <p>{tip.description}</p>
              <div className="tip-footer">
                <span className="tip-expert">Source: {tip.expert}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SleepTips;