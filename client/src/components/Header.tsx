import React from 'react';
import '../App.css';

const Header = () => (
  <div className="header-container">
    <div className="hexagon-corner hex-left" />
    <div className="hexagon-corner hex-left2" />
    <h1>CatanHelper</h1>
    <div className="hexagon-corner hex-right" />
    <div className="hexagon-corner hex-right2" />
  </div>
);

export default Header;