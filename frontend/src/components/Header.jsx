import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className='header'>
      <div className="header-content">
        <span className="header-eyebrow">For hostellers, PGs and room-life days</span>
        <h2>Healthy Indian meals from the state you miss.</h2>
        <p>
          Find lighter regional favourites from Maharashtra, Gujarat, Punjab,
          Bengal, Rajasthan, Bihar, South India and the North-East.
        </p>
        <div className="header-actions">
          <a href="#explore-menu">View Healthy Menu</a>
          <span>Regional, low-oil, student-friendly</span>
        </div>
        <div className="header-stats" aria-label="Meal benefits">
          <strong>48 meals</strong>
          <strong>8 regions</strong>
          <strong>Rs. 69+</strong>
        </div>
      </div>
    </div>
  );
};

export default Header;
