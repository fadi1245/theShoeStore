import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import cr from '../cart/cart.module.css';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import add from '../cart/assets/add.png';
import minus from '../cart/assets/minus.png';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';


export default function Cart() {
  const [cartitems, setCartitems] = useState([]); 
  const [total, settotal] = useState(0);
  const navigate= useNavigate()

  useEffect(() => {
    const fetchCart = async () => {
      const userid = sessionStorage.getItem('userid');
      try {
        const response = await axios.get('http://localhost:7000/product/cartget', { headers: { userid } });
        const cartData = response.data;

        const productDetails = await Promise.all(
          cartData.map(async (item) => {
            const productResponse = await axios.get(`http://localhost:7000/product/getbyid/${item.productId}`);
            return {
              ...item,
              productId: productResponse.data 
            };
          })
        );

        setCartitems(productDetails);
      } catch (err) {
        console.error('Error fetching cart data:', err);
      }
    };
    fetchCart();
  }, []);

  useEffect(() => {
    const total = cartitems.reduce((acc, item) => acc + item.productId.productprice * item.quantity+30+50, 0);
    settotal(total);
  }, [cartitems]);

  const handleIncrease = async (productId) => {
    const userid = sessionStorage.getItem('userid');
    try {
      await axios.post('http://localhost:7000/product/cartadd', { userId: userid, productId });
      setCartitems(prevItems =>
        prevItems.map(item =>
          item.productId._id === productId ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } catch (err) {
      console.log("Error increasing quantity", err);
    }
  };

  const handleDecrease = async (productId) => {
    const userid = sessionStorage.getItem('userid');
    const item = cartitems.find(item => item.productId._id === productId);
    if (item.quantity === 1) return;

    try {
      await axios.post('http://localhost:7000/product/cartremove', { userId: userid, productId });
      setCartitems(prevItems =>
        prevItems.map(cartItem =>
          cartItem.productId._id === productId ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
        )
      );
    } catch (error) {
      console.error('Error decreasing quantity:', error);
    }
  };

  const handleClearCart = async () => {
    const userid = sessionStorage.getItem('userid');
    try {
      await axios.delete('http://localhost:7000/product/clearcart', { headers: { userid: userid } });
      setCartitems([]); // to Clearing  cart state
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const handlecheckout=()=>{
        navigate('/checkout',{state:{totalAmount:total}})
  }

  return (
    <div>
      <Navbar />
      <div className={cr.maindiv}>
        <div className={cr.seconmaindiv}>
        {cartitems && cartitems.length > 0 ? (
          cartitems.map(item => (
            <Box key={item.productId._id} className={cr.itembox}>
              <div className={cr.leftside}>
                <img src={item.productId.productimgone} alt="" />
                <div>
                  <p className={cr.shoename}>{item.productId.productname}</p>
                  <p className={cr.shoeprice}>${item.productId.productprice}</p>
                </div>
              </div>
              <div className={cr.rightside}>
                <img
                  src={add}
                  alt="Increase"
                  onClick={() => handleIncrease(item.productId._id)}
                />
                <div>{item.quantity}</div>
                <img
                  src={minus}
                  alt="Decrease"
                  onClick={() => handleDecrease(item.productId._id)}
                />
              </div>
            </Box>
          ))
        ) : (
          <p className={cr.empty}>Cart is lonely.</p>
        )}
        </div>
        <div>
        <Box className={cr.pricebox}>
          <p>delivery charge: $50</p>
          <p>Convinience fees: $30</p>
          <h3 className={cr.total}>Subtotal: ${total.toFixed(2)}</h3>
          <button className={cr.clearbtn} onClick={handleClearCart}>Clear Cart</button>
          <button className={cr.checkoutbtn} onClick={handlecheckout}>Proceed to checkout</button>
        </Box>
        </div>
      </div>
      <Footer />
    </div>
  );
}
