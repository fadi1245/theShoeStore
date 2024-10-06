import { Box, Drawer } from '@mui/material';
import React, { useContext, useState } from 'react';
import logo from '../assets/logo.png';
import nr from '../components/styles/navbar.module.css';
import cart from '../components/componentsassets/cart.png';
import heart from '../components/componentsassets/heart.png';
import user from '../components/componentsassets/user.png';
import search from '../components/componentsassets/observation.png';
import list from '../components/componentsassets/list.png';
import Sidebar from './sidebar';
import { Link } from 'react-router-dom';
import authen from '../context/authen'; // Correct import for context

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isLogin } = useContext(authen); // Use correct context consumption

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <Box className={nr.navbar}>
        <div>
          <img src={logo} className={nr.logo} alt="logo" />
        </div>
        <div className={nr.rigthicons}>
          {/* Conditionally show the cart and heart if logged in */}
          {isLogin ? (
            <>
              <img src={heart} alt="heart" />
              <Link to="/cart"><img src={cart} alt="cart" /></Link>
            </>
          ) : (
            // Show user icon if not logged in
            <Link to="/login"><img src={user} alt="user" /></Link>
          )}
        </div>
      </Box>
      <Box className={nr.secondnav}>
        <div className={nr.snleft} onClick={toggleDrawer(true)}>
          <img src={list} alt="menu" />
        </div>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          <Sidebar />
        </Drawer>
        <div className={nr.snright}>
          <div>
            <input type="search" className={nr.searchbox} />
          </div>
          <div className={nr.searchicon}>
            <img src={search} alt="search" />
          </div>
        </div>
      </Box>
    </>
  );
}
