import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category, setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our menu</h1>
        <p className='explore-menu-text'>Indulge in a variety of authentic Nepalese and Indian flavors with our carefully crafted menu. 
            From the soft and flavorful Veg and Non-Veg Momos (Chicken, Mutton) to the crispy, mouthwatering Egg Rolls, each dish is a true delight. 
            Savor the heat of our Spicy Chicken Wings, or experience the richness of Nepali-style Goat Curry. 
            Our menu also features comforting Chowmein and Pasta, perfect for all tastes. And no meal is complete without a warm cup of Masala Chai, 
            brewed to perfection!</p>
        <div className="explore-menu-list">
            {menu_list.map((item, index)=>{
                return (
                    <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)}  key={index} className='explore-menu-list-item'>
                        <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                        <p> {item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr/>
    </div>
  )
}

export default ExploreMenu
