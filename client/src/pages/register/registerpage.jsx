import { Box, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import lr from './register.module.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export default function Registerpage() {
  const [data, setData] = useState({});
  const nav = useNavigate();
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:7000/user/reg', data)
      .then(res => {
        console.log(res);
        alert("Registration successful");

      })
      .catch(err => {
        console.log(err);
        alert("Registration failed");
      });
  };

  return (
    <div className={lr.back}>
    <div className={lr.maindiv}>
      <div>
      <Box
      
        sx={{
          width: 600,
          height: 600,
          padding: 4,
          borderRadius: 1,
          bgcolor: '#9c9b92',
          boxShadow: 3
        }}
      >
                <h1 className={lr.heading}>Sign in</h1>

        <form onSubmit={handleSubmit} className={lr.form} method='POST'>
          <TextField
            className={lr.formelements}
            name='fullname'
            variant='filled'
            label='Full Name'
            placeholder='Full name'
            required
            onChange={handleChange}
            sx={{ mb: 2, ml:20, mr:20}}
          />
          <TextField
            className={lr.formelements}
            name='email'
            type='email'
            variant='filled'
            label="Email"
            placeholder='Email'
            required
            onChange={handleChange}
            sx={{ mb: 2, ml:20, mr:20 }}
          />
          <TextField
            className={lr.formelements}
            name='age'
            label="Age"
            type='number'
            placeholder='Age'
            required
            onChange={handleChange}
            sx={{ mb: 2, ml:20, mr:20 }}
          />
          <TextField
            className={lr.formelements}
            name='password'
            type='password'
            variant='filled'
            label="Password"
            placeholder='Password'
            required
            onChange={handleChange}
            sx={{ mb: 2, ml:20, mr:20 }}
          />
          <div style={{display:'flex', justifyContent:'center'}}>
          <Button variant='contained' type='submit'>
            Register
          </Button>
          </div>
        </form>
        <a href="/login" className={lr.question}>Aldready signed in?Login</a>
      </Box>
      </div>
      <div className={lr.rightside}>
          
      </div>
    </div>
    </div>
  );
}