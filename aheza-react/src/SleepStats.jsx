import React from 'react';

const SleepStats = () => {
  return (
    <section className="sleep-stats">
      <div className="container">
        <div className="stats-content">
          <div className="stats-info" data-scroll>
            <h2>The Science of Better Sleep</h2>
            <p>Our mattresses are designed based on extensive research into sleep patterns and comfort preferences</p>
          </div>
          <div className="stats-grid">
            <div className="stat-item" data-scroll>
              <div className="stat-number" data-count="94">0</div>
              <div className="stat-label">Customer Satisfaction</div>
            </div>
            <div className="stat-item" data-scroll>
              <div className="stat-number" data-count="45">0</div>
              <div className="stat-label">Minutes to Fall Asleep</div>
            </div>
            <div className="stat-item" data-scroll>
              <div className="stat-number" data-count="87">0</div>
              <div className="stat-label">Report Better Sleep</div>
            </div>
            <div className="stat-item" data-scroll>
              <div className="stat-number" data-count="10">0</div>
              <div className="stat-label">Year Warranty</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SleepStats;