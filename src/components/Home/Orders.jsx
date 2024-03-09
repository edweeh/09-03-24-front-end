import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getToken = () => {
      return localStorage.getItem('token');
    };

    const token = getToken();
    if (!token) {
      navigate('/login');
    } else {
      const payload = token.split('.')[1];
      try {
        const decodedPayload = atob(payload);
        const { id: userId, username: decodedUsername } = JSON.parse(decodedPayload);

        setUsername(decodedUsername);
        setUserId(userId);

        // Fetch orders by userId
        const fetchOrders = async () => {
          try {
            const response = await axios.get(`/order/orders/${userId}`);
            setOrders(response.data.orders);
          } catch (error) {
            console.error('Error fetching orders:', error);
          }
        };

        fetchOrders();
      } catch (error) {
        console.error('Error decoding token payload:', error);
      }
    }
  }, [navigate, userId]);

  return (
    <div>
      <h2>Hello, {username}!</h2>
      <h3>Your Orders:</h3>
      <ul>
        {orders.map(order => (
          <li key={order._id}>{/* Display order details here */}</li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
