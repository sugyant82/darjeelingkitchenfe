import React, { useContext, useState } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Cart = () => {

  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url, setTotalDeliveryAmount } = useContext(StoreContext);

  const navigate = useNavigate();

  const [deliveryType, setDeliveryType] = useState('pickup');
  const [deliveryArea, setDeliveryArea] = useState('');

  const baseTotal = getTotalCartAmount();

  let deliveryCharge = 0;
  if (deliveryType === 'delivery') {
    if (['manukau', 'manurewa', 'flat bush', 'papatoetoe'].includes(deliveryArea)) {
      deliveryCharge = 10;
    } else if (deliveryArea === 'rest') {
      deliveryCharge = 15;
    }
  }

  const finalTotal = (baseTotal + deliveryCharge).toFixed(2);

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {Object.values(cartItems).some(qty => qty > 0) ? (
          food_list.map((item, index) => {
            if (cartItems?.[item._id] > 0) {
              return (
                <div key={item._id || index}>
                  <div className="cart-items-title cart-items-item">
                    <img src={url + "/images/" + item.image} alt={item.name} />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>{cartItems?.[item._id]}</p>
                    <p>${(item.price * cartItems?.[item._id]).toFixed(2)}</p>
                    <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
                  </div>
                  <hr />
                </div>
              );
            }
          })
        ) : (
          <div className="empty-cart">
            <img src={assets.empty_cart} alt="Empty cart" />
          </div>
        )}

      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>

          {/* Delivery or Pickup Option */}
          <div className="delivery-options" style={{ marginBottom: '20px' }}>
            <p><h4>Select Delivery Method:</h4></p>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              <input
                type="radio"
                name="deliveryType"
                value="pickup"
                checked={deliveryType === 'pickup'}
                onChange={() => { setDeliveryType('pickup'); setDeliveryArea(''); }}
                style={{ accentColor: '#B83E26', marginRight: '8px' }}
              />
              Pickup (<small style={{ color: 'gray' }}>
                No Delivery Charge
              </small>)
            </label>

            <label style={{ display: 'block', marginBottom: '10px' }}>
              <input
                type="radio"
                name="deliveryType"
                value="delivery"
                checked={deliveryType === 'delivery'}
                onChange={() => setDeliveryType('delivery')}
                style={{ accentColor: '#B83E26', marginRight: '8px' }}
              />
              Delivery (<small style={{ color: 'gray' }}>
                Delivery only available for South Auckland.
              </small>)
            </label>

            {deliveryType === 'delivery' && (
              <div>
                <div
                  style={{
                    marginTop: '10px',
                    marginLeft: '20px',
                    border: '1px solid #B83E26',
                    borderRadius: '8px',
                    padding: '10px 15px',
                    backgroundColor: '#fff8f7',
                    maxWidth: '400px'
                  }}
                >
                  <label style={{ display: 'block', marginBottom: '10px' }}>
                    <input
                      type="radio"
                      name="deliveryArea"
                      value="preferred"
                      checked={['manukau', 'manurewa', 'flat bush', 'papatoetoe'].includes(deliveryArea)}
                      onChange={() => setDeliveryArea('manukau')}
                      style={{ accentColor: '#B83E26', marginRight: '8px' }}
                    />
                    Manukau / Manurewa / Flat Bush / Papatoetoe ($10)
                  </label>
                  <label style={{ display: 'block' }}>
                    <input
                      type="radio"
                      name="deliveryArea"
                      value="rest"
                      checked={deliveryArea === 'rest'}
                      onChange={() => setDeliveryArea('rest')}
                      style={{ accentColor: '#B83E26', marginRight: '8px' }}
                    />
                    Rest of South Auckland ($15)
                  </label>
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${baseTotal.toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${deliveryCharge.toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${finalTotal}</b>
            </div>
          </div>
          <button
            disabled={deliveryType === 'delivery' && deliveryArea === ''}
            onClick={() => {
              setTotalDeliveryAmount(deliveryCharge.toFixed(2));
              navigate('/order');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>

        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Cart
