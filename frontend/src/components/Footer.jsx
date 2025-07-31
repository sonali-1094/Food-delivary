import React from 'react'
import './Footer.css'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt='' />
                <p>DelishBite is your one-stop food delivery app that brings delicious meals from your favorite local restaurants straight to your doorstep. Whether you're craving spicy street food, healthy salads, comforting curries, or sweet desserts — we've got something for every mood.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt='' />
                    <img src={assets.twitter_icon} alt='' />
                    <img src={assets.linkedin_icon} alt='' />

                </div>
            </div>

            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivary</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+1 121-456-5678</li>
                    <li>contact@tomato.com</li>
                </ul>
            </div>
        </div>
        <hr/>
        <p className="footer-copyright">Copyright 2025 Tomato.com - All Rights Reserved.</p>
      
    </div>
  )
}

export default Footer
