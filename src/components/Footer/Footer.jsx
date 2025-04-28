import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {

    const handleLinkClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
      
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img className="footer-logo" src={assets.footer_logo} alt='Darjeeling Momo NZ Logo'/>
                <p>
                    Located in the heart of Auckland, we are your go-to destination for authentic Nepalese and Indian flavors. 
                    At Darjeeling Momo NZ, we take pride in bringing you a rich variety of traditional dishes, crafted with care and passion. 
                    From our kitchen to your home, each meal is thoughtfully prepared using the finest ingredients, 
                    bringing people together and keeping age-old traditions alive.
                </p>
                <div className="footer-social-icons">
                    <a href='https://www.facebook.com/profile.php?id=61573682579457' target="_blank" rel="noopener noreferrer">
                        <img src={assets.facebook_icon} alt="Facebook" />
                    </a>
                    <img src={assets.instagram_icon} alt="Instagram" />
                    <a href='https://www.tiktok.com/@darjeelingkitchennz' target="_blank" rel="noopener noreferrer">
                        <img src={assets.tiktok_icon} alt="Tiktok" />
                    </a>
                </div>
            </div>

            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li><Link to="/" onClick={handleLinkClick}>Home</Link></li>
                    <li><Link to="/about" onClick={handleLinkClick}>About</Link></li>
                    <li><Link to="/delivery" onClick={handleLinkClick}>Delivery</Link></li>
                    <li><Link to="/privacy-policy" onClick={handleLinkClick}>Privacy Policy</Link></li>
                    <li><Link to="/refund-policy" onClick={handleLinkClick}>Refund Policy</Link></li>
                    <li><Link to="/terms-and-conditions" onClick={handleLinkClick}>Terms And Conditions</Link></li>
                </ul>
            </div>

            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li><a href="tel:+64278024729">+64-278024729</a></li>
                    <li><a href="mailto:darjeelinglimitednz@gmail.com">darjeelinglimitednz@gmail.com</a></li>
                </ul>
            </div>
        </div>

        <hr/>

        <div className="footer-bottom-links">
          <p>© 2025 Darjeeling Momo NZ | All rights reserved | </p>
          <div className="footer-policies">
            <Link to="/privacy-policy" onClick={handleLinkClick}>Privacy Policy</Link>
            <span> | </span>
            <Link to="/terms-and-conditions" onClick={handleLinkClick}>Terms & Conditions</Link>
            <span> | </span>
            <Link to="/refund-policy" onClick={handleLinkClick}>Refund Policy</Link>
          </div>
        </div>

    </div>
  )
}

export default Footer
