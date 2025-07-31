import React, { useState } from 'react';
import './Navbar.css';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menu, setMenu] = useState("Home");

  return (
    <div className='navbar'>
      <img src={assets.logo} alt='logo' className='logo' />

      <ul className='navbar-menu'>
        <Link to='/' className={menu === "Home" ? "active" : ""} onClick={() => setMenu("Home")}>Home</Link>
        <a href='#explore-menu' className={menu === "Menu" ? "active" : ""} onClick={() => setMenu("Menu")}>Menu</a>
        <a href='#app-download' className={menu === "Mobile-app" ? "active" : ""} onClick={() => setMenu("Mobile-app")}>Mobile-app</a>
        <a href='#footer' className={menu === "contact-us" ? "active" : ""} onClick={() => setMenu("contact-us")}>Contact us</a>
      </ul>

      <div className='navbar-right'>
        <img src={assets.search_icon} alt='search' />
        <div className='navbar-search-icon'>
          <img src={assets.basket_icon} alt='basket' />
          <div className='dot'></div>
        </div>
        <button>Sign in</button>
      </div>
    </div>
  );
};

export default Navbar;
