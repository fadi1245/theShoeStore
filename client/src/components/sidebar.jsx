import React, { useContext, useEffect, useState } from 'react';
import sr from '../components/styles/sidebar.module.css';
import userblack from '../components/componentsassets/userblack.png';
import settings from '../components/componentsassets/setting.png';
import shop from '../components/componentsassets/shop.png';
import phone from '../components/componentsassets/telephone.png';
import order from '../components/componentsassets/sent.png';
import { Link, useNavigate } from 'react-router-dom';
import authen from '../context/authen';


export default function Sidebar() {
  const { isLogin, setLogin } = useContext(authen);
  const [role, setRole] = useState('');
  const navigate = useNavigate()

  // Fetch user role from sessionStorage
  useEffect(() => {
    const userRole = sessionStorage.getItem('role');
    if (userRole) {
      setRole(userRole);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    setLogin(false);
    navigate('/')
  };

  return (
    <div>
      <div className={sr.sidebar}>
        <Link to="/products">
          <div>
            <img src={shop} alt="Shop" />
            <p>Shop</p>
          </div>
        </Link>
        <div>
          <img src={phone} alt="Contact" />
          <p>Contact</p>
        </div>
        <div>
          <img src={userblack} alt="Account" />
          <p>Account</p>
        </div>

        {isLogin ? (
          <>
                  <div>
          <img src={order} alt="Orders" />
          <p>Orders</p>
        </div>
            <div onClick={handleLogout}>
              <img src={settings} alt="Log out" />
              <p>Log out</p>
            </div>

            {/* Conditionally render USERS and PRODUCTS if the role is 'admin' */}
            {role === 'admin' && (
              <>
                <Link to="/useradmin">
                  <div>
                    <img src={settings} alt="USERS" />
                    <p>USERS</p>
                  </div>
                </Link>
                <Link to="/proadmin">
                  <div>
                    <img src={settings} alt="PRODUCTS" />
                    <p>PRODUCTS</p>
                  </div>
                </Link>
              </>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
