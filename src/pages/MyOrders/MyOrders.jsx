import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';
import { useSearchParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import Swal from 'sweetalert2';


const MyOrders = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // 🆕 Add loading state
    const [showEmpty, setShowEmpty] = useState(false);

    const { url, token } = useContext(StoreContext);
    const [searchParams] = useSearchParams();

    const fetchOrders = async () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setLoading(true);
        setShowEmpty(false); // Hide empty UI initially
        console.log(data);

        try {

            setTimeout(async () => {
                const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });

                const orderData = response.data.data;
                setData(orderData);

                if (orderData.length === 0) {
                    // Delay empty image appearance
                    setTimeout(() => {
                        setShowEmpty(true);
                        setLoading(false);
                    }, 300);
                } else {
                    setLoading(false);
                }
                console.log(orderData);
            }, 100); // Simulate a loading delay of half second

        } catch (error) {
            console.error("Error fetching orders", error);
            setLoading(false);
        }
    };


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

    useEffect(() => {
        const orderCreatedsuccess = searchParams.get("success");
        if (orderCreatedsuccess === "true") {
            // Show success message
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Order has been created successfully.',
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
        } else if (orderCreatedsuccess === "false") {
            // Show failure message
            Swal.fire({
                icon: 'error',
                title: 'Payment Failed!',
                text: 'Something went wrong. Please try again.',
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
    }, [searchParams]);

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className="my-orders">
            <h2>My Orders</h2>
            <div className="container">
                {loading && <Loader />}

                {!loading && data.length > 0 && [...data]
                    .sort((a, b) => new Date(b.orderTime) - new Date(a.orderTime))
                    .map((order, index) => (
                        <div key={index} className={order.status === 'Completed' ? "my-orders-order-completed" : "my-orders-order"}>
                            <img src={order.status === 'Completed' ? assets.parcel_gray_ico : assets.parcel_ico} alt="" />
                            <p>Order No: {String(order._id).slice(-5).toUpperCase()}</p>
                            <p>
                                {order.items.map((item, i) => `${item.name} x ${item.quantity}${i !== order.items.length - 1 ? ', ' : ''}`)}
                            </p>
                            <p>${order.amount}</p>
                            <p>Order time: {formatDate(order.orderTime)}</p>
                            <p><span>Order Status: </span> <b style={{ color: 'green', fontWeight: 'italic' }}>{order.status}</b></p>
                            <p>
                                <span>Payment: </span>
                                <strong
                                    style={{
                                        backgroundColor: order.payment === 'paid' ? "green" : (order.paymentMethod === "stripe" && order.payment === 'failed' ? "red" : "orange"),
                                        fontWeight: 'bold',
                                        color: 'white', // Highlight color
                                        padding: '2px 5px', // Optional: adds some padding around the text
                                        borderRadius: '3px' // Optional: rounds the corners for a more polished look
                                    }}
                                >
                                    {order.payment === 'paid' ? "PAID" : (order.paymentMethod === "stripe" && order.payment === 'failed' ? "FAILED" : "PENDING")}
                                </strong>
                            </p>
                            <button onClick={fetchOrders}>Track Order</button>
                        </div>
                    ))}

                {/* Show empty state only after 2 sec delay if no data */}
                {!loading && data.length === 0 && showEmpty && (
                    <div className="my-orders-empty">
                        <img src={assets.empty_order} alt="No orders" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
