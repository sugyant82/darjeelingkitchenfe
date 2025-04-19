import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';
import { useSearchParams } from 'react-router-dom';

const MyOrders = () => {

    const [data, setData] = useState([]);
    const { url, token } = useContext(StoreContext);

    const [searchParams, setSearchParams] = useSearchParams();


    const fetchOrders = async () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
        setData(response.data.data);
        console.log(response.data.data);
    }

    const formatDate = (date) => {
        return new Date(date).toLocaleString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }).replace(',', ' - ');
      };

    //write a function to check if order created was success or not
    useEffect(() => {
        const orderCreatedsuccess = searchParams.get("success");
        if (orderCreatedsuccess === "true") {
            alert("Order Created Successfully");
        }
        else if (orderCreatedsuccess === "false") {
            alert("Order Creation Failed");
        }
    }, [searchParams])


    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token])

    return (
        <div className="my-orders">
            <h2>My Orders</h2>
            <div className="container">
                {data && data.length > 0 && [...data]
                    .sort((a, b) => new Date(b.orderTime) - new Date(a.orderTime))
                    .map((order, index) => {
                        return (
                            <div key={index} className={order.status === 'Completed' ? "my-orders-order-completed" : "my-orders-order"}>
                                <img src={order.status === 'Completed' ? assets.parcel_gray_ico : assets.parcel_ico} alt="" />
                                <p>{order.items.map((item, index) => {
                                    if (index === order.items.length - 1) {
                                        return item.name + " x " + item.quantity
                                    }
                                    else {
                                        return item.name + " x " + item.quantity + ", "
                                    }
                                })}
                                </p>
                                <p>${order.amount}</p>
                                <p>Order time: {formatDate(order.orderTime)}</p>
                                <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                                <button onClick={fetchOrders}>Track Order</button>
                            </div>
                        )
                    })}
                {data.length === 0 &&
                    <div className="my-orders-empty">
                        <img src={assets.empty_order} alt="" />
                    </div>
                }
            </div>
        </div>
    )
}

export default MyOrders
