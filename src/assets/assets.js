import logo from './darjeeling.png'
import footer_logo from './logo.png'
import search_icon from './search_icon.png'
import basket_icon from './basket_icon.png'
import add_icon_white from './add2Cart.png'
import add_icon_green from './add_icon_green.png'
import remove_icon_red from './remove_icon_red.png'
import menu_1 from './momo-combo.png'
import menu_2 from './veg-momos.png'
import menu_3 from './chicken-momos.png'
import menu_4 from './mutton-momos.png'
import menu_5 from './beverages.png'
import menu_6 from './other-dishes.png'

import food_1 from './food_1.jpeg'
import food_2 from './food_2.webp'
import food_3 from './food_3.jpeg'
import food_4 from './food_4.webp'
import food_5 from './food_5.png'
import food_6 from './food_6.png'
import food_7 from './food_7.png'
import food_8 from './masalachai.jpg'

import facebook_icon from './facebook_icon.png'
import instagram_icon from './instagram_icon.png'
import tiktok_icon from './tiktok_icon.png'

import play_store from './play_store.png'
import app_store from './app_store.png'

import cross_icon from './cross_icon.png'

import profile_icon from './profile_icon.png'
import bag_icon from './bag_icon.png'
import logout_icon from './logout_icon.png'
import parcel_ico from './parcel-ico.png'
import parcel_gray_ico from './parcel-gray-ico.png'
import rating_stars from './rating_stars.png'

import google_login_button from './google-login-button.png'

import empty_order from './empty_order.gif'
import empty_cart from './empty_cart.png'
import stripe_button from './stripe_button.png'
import cod_button from './cod_button.png'

export const assets = {
logo,
footer_logo,
search_icon,
basket_icon,
add_icon_white,
add_icon_green,
remove_icon_red,
facebook_icon,
instagram_icon,
tiktok_icon,
play_store,
app_store,
cross_icon,
profile_icon,
logout_icon,
bag_icon,
parcel_ico,
parcel_gray_ico,
rating_stars,
google_login_button,
empty_order,
empty_cart,
stripe_button,
cod_button
}

export const menu_list = [
{
    menu_name: "Combos",
    menu_image: menu_1
},
{
    menu_name: "Pure Veg",
    menu_image: menu_2
},
{
    menu_name: "Chicken",
    menu_image: menu_3
},
{
    menu_name: "Mutton",
    menu_image: menu_4
},
{
    menu_name:"Beverages",
    menu_image: menu_5
},
{
    menu_name: "Specials",
    menu_image: menu_6
}
]


export const food_list = [
    {
        _id: "1",
        name: "Chicken Momo",
        image: food_1,
        price: 12,
        description: "best chicken momo in Auckland",
        category: "appetizers"
    },
    {
        _id: "2",
        name: "Veg Momo",
        image: food_2,
        price: 12,
        description: "best veg momo in Auckland",
        category: "appetizers"
    },
    {
        _id: "3",
        name: "Mutton Momo",
        image: food_3,
        price: 15,
        description: "best mutton momo in Auckland",
        category: "appetizers"
    },
    {
        _id: "4",
        name: "Spicy Wings",
        image: food_4,
        price: 12,
        description: "best chicken wings in Auckland",
        category: "starters"
    },
    {
        _id: "5",
        name: "Goat Curry",
        image: food_5,
        price: 15,
        description: "best goat curry in Auckland",
        category: "mains"
    },
    {
        _id: "6",
        name: "Chowmein",
        image: food_6,
        price: 10,
        description: "best chowmein in Auckland",
        category: "mains"
    },
    {
        _id: "7",
        name: "Egg Roll",
        image: food_7,
        price: 12,
        description: "best egg roll in Auckland",
        category: "starters"
    },
    {
        _id: "8",
        name: "Masala Chai",
        image: food_8,
        price: 5,
        description: "best chai in Auckland",
        category: "beverages"
    }
]