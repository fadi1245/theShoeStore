import './App.css';
import Registerpage from './pages/register/registerpage';
import LoginPage from './pages/login/loginPage';
import Mainpage from './pages/mainpage/mainpage';
import Shopage from './pages/shop/shopage';
import Cart from './pages/cart/cart';
import Productpage from './pages/productpage/productpage';
import Adminprod from './pages/admin/adminprod';
import Adminusers from './pages/admin/adminusers';
import { Route, Routes } from 'react-router-dom';
import authen from './context/authen';
import { useState } from 'react';
import Paymentpage from './pages/payment/paymentpage';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Addproduct from './pages/admin/addproduct';
import Editproduct from './pages/admin/editproduct';
import Success from './pages/payment/success';

function App() {
  const [isLogin, setLogin] = useState(false); // Rename to isLogin for clarity

  const stripePromise = loadStripe("pk_test_51Q2bKXGGHrDuqJUhNarYEA4gZBdUqq4qOKZYsBf4UOQzcwHwhWMWB3KC3LSHlGYRnlCIm4UuTfGdOJQQVIxdZJfs00sR43Hocb");

  return (
    <>
      <authen.Provider value={{ isLogin, setLogin }}> {/* Pass isLogin and setLogin */}
        <Routes>
          <Route path='/' element={<Mainpage />} />
          <Route path='/products' element={<Productpage />} />
          <Route path='/shopage/:id' element={<Shopage />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/proadmin' element={<Adminprod />} />
          <Route path='/useradmin' element={<Adminusers />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/reg' element={<Registerpage />} />
          <Route path='/addprod' element={<Addproduct/>}/>
          <Route path='/editprod/:id' element={<Editproduct/>}/>
          <Route path='/success' element={<Success/>}/>
          <Route 
            path='/checkout' 
            element={
              <Elements stripe={stripePromise}>
                <Paymentpage />
              </Elements>
            } 
          />        
          </Routes>
      </authen.Provider>
    </>
  );
}

export default App;
