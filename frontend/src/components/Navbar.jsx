import React, { useContext, useEffect, useRef, useState } from 'react';
import './Navbar.css';
import { assets } from '../assets/assets';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { StoreContext } from '../context/StoreContext';

const Navbar = () => {
  const [menu, setMenu] = useState("Home");
  const [showSearch, setShowSearch] = useState(false);
  const { getTotalCartItems, searchText, setSearchText } = useContext(StoreContext);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const cartCount = getTotalCartItems();

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  const handleSearchToggle = () => {
    setShowSearch((prev) => !prev);
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  return (
    <div className='navbar'>
      <Link to='/' className='navbar-brand' onClick={() => setMenu("Home")}>
        <span>GharSe</span>Bite
      </Link>

      <ul className='navbar-menu'>
        <Link to='/' className={menu === "Home" ? "active" : ""} onClick={() => setMenu("Home")}>Home</Link>
        <a href='#explore-menu' className={menu === "Menu" ? "active" : ""} onClick={() => setMenu("Menu")}>Menu</a>
        <a href='#app-download' className={menu === "Mobile-app" ? "active" : ""} onClick={() => setMenu("Mobile-app")}>Student App</a>
        <a href='#footer' className={menu === "contact-us" ? "active" : ""} onClick={() => setMenu("contact-us")}>Contact us</a>
      </ul>

      <div className='navbar-right'>
        <div className='navbar-search'>
          <button
            type='button'
            className='navbar-search-btn'
            onClick={handleSearchToggle}
            aria-label='Toggle search'
          >
            <img src={assets.search_icon} alt='search' />
          </button>
          {showSearch && (
            <input
              ref={searchInputRef}
              type='text'
              className='navbar-search-input'
              placeholder='Search state or dish...'
              value={searchText}
              onChange={handleSearchChange}
            />
          )}
        </div>
        <Link to='/cart' className='navbar-search-icon' aria-label='Go to cart'>
          <img src={assets.basket_icon} alt='basket' />
          {cartCount > 0 && <div className='cart-count'>{cartCount}</div>}
        </Link>
        <SignedOut>
          <Link to='/sign-in'><button>Sign in</button></Link>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl='/' />
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
