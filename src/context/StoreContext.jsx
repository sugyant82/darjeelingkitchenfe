import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url = "https://darjeelingkitchenbe.onrender.com";
    //const url = "http://localhost:4000";
    //const url= import.meta.env.VITE_BACKEND_URL;

    const [token, setToken] = useState("");
    const [user, setUser] = useState(null);

    const [food_list, setFoodList] = useState([]);

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
    }

    const storeFirebaseUserContext = (user) => {
        setUser(user);
    }

    const getFirebaseUserContext = () => {
        return user;
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }

        // Round to 2 decimal places
        return parseFloat(totalAmount.toFixed(2));
    }

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data);
        console.log(response.data.data);

    }

    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
        setCartItems(response.data.cartData);
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    }, [])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        setFoodList,
        storeFirebaseUserContext,
        getFirebaseUserContext
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )


}
