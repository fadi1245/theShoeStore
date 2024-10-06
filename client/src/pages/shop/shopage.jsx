import React, { useEffect, useState } from 'react';
import sr from '../shop/shop.module.css';
import Imageselector from '../../components/imageselector';
import { Box } from '@mui/material';
import fast from '../shop/assets/fast.png';
import handle from '../shop/assets/handle.png';
import ret from '../shop/assets/return.png';
import Footer from '../../components/footer';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ShopPage() {
  const param = useParams();
  const [data, setdata] = useState([]);

  useEffect(() => {
    if (param.id) {
      const fetchProducts = async () => {
        try {
          const res = await axios.get(`http://localhost:7000/product/getbyid/${param.id}`);
          setdata(res.data);
        } catch (err) {
          console.log("Error", err);
        }
      };
      fetchProducts();
    }
  }, [param.id]);

  const addToCart = async () => {
    const userid = sessionStorage.getItem('userid');
    try {
      await axios.post('http://localhost:7000/product/cartadd', {
        userId: userid, // Use userId (camelCase)
        productId: data._id, // Use productId (camelCase)
      });
      alert('Product added to cart');
    } catch (err) {
      console.log("Error", err);
      alert("Failed to add to cart");
    }
  };

  return (
    <>
      <div>
        {data ? (
          <div>
            <Box className={sr.box}>
              <div>
                <Imageselector imgone={data.productimgone} imgtwo={data.productimgtwo} imgthree={data.productimgthree} />
              </div>
              <div className={sr.details}>
                <h1>{data.productname}</h1>
                <h3><span>MRP : &#8377;{data.productprice}</span></h3>
                <h5>incl. of taxes (Also includes all applicable duties)</h5>
                <h2 style={{ marginTop: '30px', marginLeft: '30px' }}>Sizes</h2>
                <div className={sr.sizes}>
                  <h5>UK7</h5>
                  <h5>UK8</h5>
                  <h5>UK9</h5>
                  <h5>UK10</h5>
                  <h5>UK11</h5>
                </div>
                <div>
                  <button className={sr.addtocart} onClick={addToCart}>Add to cart</button>
                  <br />
                  <button className={sr.addtocart}>Add to wishlist</button>
                </div>
              </div>
            </Box>

            <div className={sr.bottompart}>
              <div className={sr.bottomleft}>
                <h5>Product details</h5>
                <p>{data.productdescription}</p>
              </div>
              <div className={sr.feutures}>
                <div>
                  <img src={fast} alt="" />
                  <p>Quick and safe delivery</p>
                </div>
                <div>
                  <img src={handle} alt="" />
                  <p>Hand packaged for perfect quality</p>
                </div>
                <div>
                  <img src={ret} alt="" />
                  <p>7 day return policy</p>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}
