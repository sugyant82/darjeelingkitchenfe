import React, { useContext } from 'react'
import './NavigationBar.css'
import { assets } from '../../assets/assets'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const NavigationBar = ({setShowLogin}) => {

  const [menu, setMenu] = useState("home");

  const {getTotalCartAmount, token, setToken, setCartItems, setUser, user } = useContext(StoreContext);

  const navigate = useNavigate();

  const logout = () =>{
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    localStorage.removeItem("cartItems");
    setToken("");
    setUser(null);
    setCartItems({});
    navigate("/");
  }

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Home</Link>
        <a href='#explore-menu' onClick={()=>{setMenu("menu");window.scrollTo({ top: 50, behavior: 'smooth' }); }} className={menu==="menu"?"active":""}>Menu</a>
        <a href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>Mobile App</a>
        <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact Us</a>
      </ul>
      <div className="navbar-right">
        <div className="navbar-search-icon">
            <Link to='/cart' ><img className='cart-icon' src={assets.basket_icon} alt="" style={{ width: '30px', height: '30px' }} /></Link>
            <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        {!token?<button onClick={()=>setShowLogin(true)} > Sign in</button>:<div className='navbar-profile'>
           {sessionStorage.getItem("user")!=undefined?<img className="account-photo" src={ JSON.parse(sessionStorage.getItem("user"))?.photoURL || assets.profile_icon} alt="User"/>:
           <img className="profile-icon" src={assets.profile_icon} alt=""/>}
           <ul className="nav-profile-dropdown">
            <li onClick={()=>navigate('/myorders')}> <img src={assets.bag_icon} alt="" /><p>Orders</p></li>
            <hr />
            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
           </ul>
           </div>}
      </div>
    </div>
  )
}

export default NavigationBar
