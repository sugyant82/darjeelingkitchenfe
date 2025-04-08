import React, { useEffect, useState } from 'react'
import NavigationBar from './components/NavigationBar/NavigationBar'
import { Route, Routes } from 'react-router-dom'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'
import ProductPopup from './components/ProductPopup/ProductPopup'

const App = () => {

  const [showLogin, setShowLogin] = useState(false);
  const [showProductDesc, setProductDesc] = useState(0);

  useEffect(()=>{
    console.log(!!showProductDesc);
  }, [showProductDesc]);


  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    {!!showProductDesc?<ProductPopup showProductDesc={showProductDesc} setProductDesc={setProductDesc}/>:<></>}
    <div className='app'>
      <NavigationBar setShowLogin={setShowLogin} />
      <Routes>
        <Route path='/' element={<Home setProductDesc={setProductDesc}/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/order' element={<PlaceOrder/>} />
        <Route path='/verify' element={<Verify/>} />
        <Route path='/myorders' element={<MyOrders/>} />
      </Routes>
    </div>

    <Footer/>
    </>
  )
}

export default App
