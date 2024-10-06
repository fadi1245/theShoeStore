import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import { TextField, Box, Button } from '@mui/material';
import ad from '../admin/addproducts.module.css';
import axios from 'axios';

export default function Addproduct() {
  const [data, setData] = useState({
    productname: '',
    productbrand: '',
    productprice: '',
    productdescription: '',
    productimgone: null,
    productimgtwo: null,
    productimgthree: null,
  });

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setData({
        ...data,
        [e.target.name]: e.target.files[0], // Handle file input
      });
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value, // Handle text input
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('productname', data.productname);
    formData.append('productprice', data.productprice);
    formData.append('productbrand', data.productbrand)
    formData.append('productdescription', data.productdescription);

    if (data.productimgone) formData.append('productimgone', data.productimgone);
    if (data.productimgtwo) formData.append('productimgtwo', data.productimgtwo);
    if (data.productimgthree) formData.append('productimgthree', data.productimgthree);

    try {
      const response = await axios.post('http://localhost:7000/product/uploadproduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert("Product added successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to add product");
    }
  };

  return (
    <div>
      <Navbar />
      <div className={ad.bg}>
        <div>
          <Box className={ad.box}>
            <form method='POST' encType="multipart/form-data" onSubmit={handleSubmit}>
              <h1>Add products</h1>
              <TextField
                className={ad.forelements}
                name='productname'
                label="Product name"
                variant='filled'
                required
                sx={{ mb: 2, ml: 20, mr: 20 }}
                onChange={handleChange}
              />
              <TextField
                className={ad.forelements}
                name='productbrand'
                label="Product Brand"
                variant='filled'
                required
                sx={{ mb: 2, ml: 20, mr: 20 }}
                onChange={handleChange}
              />
              <TextField
                className={ad.forelements}
                name='productprice'
                label="Product Price"
                variant='outlined'
                type='number'
                required
                sx={{ mb: 2, ml: 20, mr: 20 }}
                onChange={handleChange}
              />
              <TextField
                className={ad.forelements}
                type='file'
                name='productimgone'
                variant='outlined'
                sx={{ mb: 2, ml: 20, mr: 20 }}
                onChange={handleChange}
              />
              <TextField
                className={ad.forelements}
                type='file'
                name='productimgtwo'
                variant='outlined'
                sx={{ mb: 2, ml: 20, mr: 20 }}
                onChange={handleChange}
              />
              <TextField
                className={ad.forelements}
                type='file'
                name='productimgthree'
                variant='outlined'
                sx={{ mb: 2, ml: 20, mr: 20 }}
                onChange={handleChange}
              />
              <TextField
                className={ad.forelements}
                name='productdescription'
                label="Product description"
                variant='filled'
                required
                sx={{ mb: 2, ml: 20, mr: 20 }}
                onChange={handleChange}
              />
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button type='submit' variant='contained'>ADD</Button>
              </div>
            </form>
          </Box>
        </div>
      </div>
    </div>
  );
}
