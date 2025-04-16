import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img className="footer-logo" src={assets.footer_logo} alt=''/>
                <p>Located in the heart of Auckland, we are your go-to destination for authentic Nepalese and Indian flavors. At Darjeeling Momo NZ, we take pride in bringing you a rich variety of traditional dishes, crafted with care and passion. From our kitchen to your home, each meal is thoughtfully prepared using the finest ingredients, bringing people together and keeping age-old traditions alive.</p>
                <div className="footer-social-icons">
                    <a href='https://www.facebook.com/profile.php?id=61573682579457'><img src={assets.facebook_icon} alt="" /></a>
                    <img src={assets.instagram_icon} alt="" />
                    <a href='https://www.tiktok.com/@darjeelingkitchennz'>
                    <img src={assets.tiktok_icon} alt="" /></a>
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+64-278024729</li>
                    <li>darjeelinglimitednz@gmail.com</li>
                </ul>
            </div>

        </div>
        <hr/>
        <p className="footer-copyright">Copyright 2025 &copy; DarjeelingMomoNZ.com - All Rights Reserved.</p>
      
    </div>
  )
}

export default Footer
