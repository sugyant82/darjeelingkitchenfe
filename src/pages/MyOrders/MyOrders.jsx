import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';
import { useSearchParams } from 'react-router-dom';

const MyOrders = () => {

    const [data, setData] = useState([]);
    const {url,token} = useContext(StoreContext);

    const [searchParams, setSearchParams] = useSearchParams();
    

    const fetchOrders = async () =>{
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
        const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}});
        setData(response.data.data);
        console.log(response.data.data);
    }

    //write a function to check if order created was success or not
    useEffect(()=>{
        const orderCreatedsuccess = searchParams.get("success");
        if(orderCreatedsuccess === "true"){
            alert("Order Created Successfully");
        }
        else if(orderCreatedsuccess === "false"){
            alert("Order Creation Failed");
        }
    },[searchParams])

    const formatDate = (date) => {
        return new Date(date).toLocaleString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }).replace(',', '-');
      };
      

    useEffect(()=>{
        if (token) {
            fetchOrders();
        }
    },[token])

  return (
    <div className="my-orders">
        <h2>My Orders</h2>
        <div className="container">
            {data && data.length>0 && data.map((order,index)=>{
                return (
                    <div key={index} className="my-orders-order">
                            <img src={assets.parcel_ico} alt=""/>
                            <p>{order.items.map((item,index)=>{
                            if(index === order.items.length-1){
                                return item.name + " x " + item.quantity
                            }
                            else{
                                return item.name+" x "+item.quantity+", "
                            }
                        })}
                            </p>
                            <p>${order.amount}</p>
                            <p>Order time: {formatDate(new Date())}</p>
                            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                            <button onClick={fetchOrders}>Track Order</button>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default MyOrders
