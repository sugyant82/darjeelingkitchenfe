import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({setProductDesc, id, name, price, description, image}) => {

    //const [itemCount, setItemCount] = useState(0)
    const {cartItems, addToCart,removeFromCart,url} = useContext(StoreContext);

    const handleClick = () => {
      console.log("food item clicked");
      setProductDesc(id);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top with smooth behavior
    };


  return (
    <div className='food-item'  onClick={handleClick}>
        <div className="food-item-img-container">
        <img className="food-item-image" src={url+"/images/"+image} alt=""/>
        </div>
    <div className="food-item-info">
        <div className="food-item-name-rating">
            <p>{name}</p>   
        </div>
        <p className='food-item-price'>${price}</p>
    </div>

    </div>
  )
}

export default FoodItem
