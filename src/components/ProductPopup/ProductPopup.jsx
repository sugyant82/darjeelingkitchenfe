import React, { useContext } from 'react'
import './ProductPopup.css'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets'

const ProductPopup = ({showProductDesc, setProductDesc}) => {

  const { food_list, url, cartItems, addToCart, removeFromCart} = useContext(StoreContext)
    

  const itemToDisplay = food_list.find(item => item._id === showProductDesc);

return (
  <div className='product-popup'>
    <div className="product-popup-container">
        <div className="product-popup-title">
                            <h2>{itemToDisplay.name}</h2>
                            <img onClick={()=>setProductDesc(0)} src={assets.cross_icon} alt="" />
        </div>
    {itemToDisplay ? (    
      <div>
        <div className="image-with-price"> 
      <img className="food-item-image-product" src={url+"/images/"+itemToDisplay.image} alt=""/>  
      <div className="floating-price-sticker">${itemToDisplay.price}</div>
      </div>
      <div className="food-desc"> {itemToDisplay.description} </div>

       </div>
    ) : (
      <div>Item not found</div>
      
    )}

    
    <hr/>
    {!cartItems[itemToDisplay._id]
            ?<img className='addProduct' onClick={()=>addToCart(itemToDisplay._id)} src={assets.add_icon_white} alt=""/> 
            :<div className='product-item-counter' > 
            <img onClick={()=>removeFromCart(itemToDisplay._id)} src={assets.remove_icon_red} alt=""/>
            <p>{cartItems[itemToDisplay._id]}</p>
            <img onClick={()=>addToCart(itemToDisplay._id)} src={assets.add_icon_green} alt=""/>
            </div>
    }

    </div>
  </div>
)

}

export default ProductPopup
