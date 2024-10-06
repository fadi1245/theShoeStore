import React, { createContext, useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import Cartreducer from './reducer';

const Cart = createContext();

export const Context = ({ children }) => {
  const initialState = {
    products: [],
    cart: JSON.parse(localStorage.getItem('cart')) || [], // Initialize cart from localStorage
  };

  const [state, dispatch] = useReducer(Cartreducer, initialState);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:7000/product/getproduct');
        dispatch({ type: 'SET_PRODUCTS', payload: data });
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Cart.Provider value={{ state, dispatch }}>
      {children}
    </Cart.Provider>
  );
};

export const Cartstate = () => {
  return useContext(Cart);
};
