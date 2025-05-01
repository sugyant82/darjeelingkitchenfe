import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import Swal from 'sweetalert2';

const PlaceOrder = () => {

  const { getTotalCartAmount, token, food_list, cartItems, url, getTotalDeliveryAmount } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData(data => ({ ...data, [name]: value }));
  }

  const placeOrdr = async (event) => {
    event.preventDefault();

    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCharges(),
      deliveryCharges: getTotalDeliveryAmount(),
      orderTime: new Date(),
    }

    let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    }
    else {
      alert("Error in response");
    }

  }

  const saveOrderWithoutPayment = async () => {
    
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCharges(),
      deliveryCharges: getTotalDeliveryAmount(),
      orderTime: new Date(),
    }

    let response = await axios.post(url + "/api/order/placecashorder", orderData, { headers: { token } });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    }
    else {
      alert("Error in response");
    }

  }

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/cart');
      //alert("Login to checkout!");
      //Swal.fire('Login', 'Please Login to checkout!', 'info');
      Swal.fire({
                      icon: 'info',
                      title: 'Login!',
                      text: 'Please Login to checkout!',
                      timer: 3500,
                      showConfirmButton: true,
                      confirmButtonColor: '#B83E26', // Red button
                      iconColor: '#B83E26',          // Red success icon
                      width: '250px',
                      customClass: {
                        popup: 'small-success-popup',
                        confirmButton: 'custom-confirm-btn'
                      }
                    });  
    }
    else if (getTotalCartAmount() === 0) {
      navigate('/cart');
      //alert("Cart is Empty");
      //Swal.fire('Empty Cart', 'Please add some items to Cart!', 'info');
      Swal.fire({
        icon: 'info',
        title: 'Empty Cart!',
        text: 'Please add some items to Cart!',
        timer: 3500,
        showConfirmButton: true,
        confirmButtonColor: '#B83E26', // Red button
        iconColor: '#B83E26',          // Red success icon
        width: '250px',
        customClass: {
          popup: 'small-success-popup',
          confirmButton: 'custom-confirm-btn'
        }
      });  
    }
  }, [token])

  const getTotalCharges = () => {
    const cartAmt = parseFloat(getTotalCartAmount());
    const delAmt = parseFloat(getTotalDeliveryAmount());
    let totalAmount = parseFloat(cartAmt + delAmt).toFixed(2);

    return totalAmount;
  };


  return (
    <form onSubmit={placeOrdr} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name'
            style={{ backgroundColor: '#fefafa', border: '1px solid #B83E26' }} />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name'
            style={{ backgroundColor: '#fefafa', border: '1px solid #B83E26' }} />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Address'
          style={{ backgroundColor: '#fefafa', border: '1px solid #B83E26' }} />
        <input name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='Suburb' />
        </div>
        <div className="multi-fields">
          <input name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip Code' />
          <input name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone'
          style={{ backgroundColor: '#fefafa', border: '1px solid #B83E26' }} />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalDeliveryAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCharges()}</b>
            </div>
          </div>

          {/* PAY WITH CARD BUTTON */}
          <button type="submit">
            <img src={assets.stripe_button} alt="Pay with Card" />
          </button>

          {/* CASH ON DELIVERY BUTTON */}
          <button type="button" onClick={saveOrderWithoutPayment} >
            <img src={assets.cod_button} alt="Cash On Delivery"/>
          </button>

        </div>
      </div>

    </form>
  )
}

export default PlaceOrder
