import React from 'react'
import './Footer.css'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <h1>GharSeBite</h1>
                <p>GharSeBite helps hostellers, PG students and people living in rooms find healthy regional Indian home-style meals without the daily mess-hunt. From poha and dhokla to rajma rice, litti chokha and idli sambar, we bring a little piece of home closer to your door.</p>
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
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+1 121-456-5678</li>
                    <li>hello@gharsebite.com</li>
                </ul>
            </div>
        </div>
        <hr/>
        <p className="footer-copyright">Copyright 2026 GharSeBite - All Rights Reserved.</p>
      
    </div>
  )
}

export default Footer
