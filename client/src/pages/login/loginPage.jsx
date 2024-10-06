import { Box, Button, TextField } from '@mui/material';
import React, { useState, useContext } from 'react';
import ar from './login.module.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import authen from '../../context/authen'; // Import context

export default function LoginPage() {
  const { setLogin } = useContext(authen); // Destructure setLogin from context
  const [data, setData] = useState({});
  const nav = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:7000/user/login', data)
      .then(res => {
        const response = res.data;
        if (response.status === 1) {
          alert("Logged in successfully");
          localStorage.setItem('token', res.data.token);
          sessionStorage.setItem('userid', response.userid);
          sessionStorage.setItem('role',response.role)
          setLogin(true); // Set login to true on success
          nav("/"); // Redirect to the home page after login
        } else {
          alert("Login failed: " + response.message);
        }
      })
      .catch(err => {
        console.error(err);
        alert("Login failed");
      });
  };

  return (
    <div>
      <div className={ar.outbox}>
        <Box className={ar.box}>
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <TextField
              className={ar.fomrelements}
              name='email'
              variant='filled'
              label="Email"
              type='email'
              required
              sx={{ mb: 2, ml: 20, mr: 20 }}
              onChange={handleChange}
            />
            <TextField
              className={ar.fomrelements}
              name='password'
              variant='filled'
              label="Password"
              type='password'
              required
              sx={{ mb: 2, ml: 20, mr: 20 }}
              onChange={handleChange}
            />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button className={ar.button} type='submit' variant='contained' sx={{ mt: 2, mb: 5 }}>
                Login
              </Button>
            </div>
          </form>
          <a href="/reg" className={ar.link}>Not signed up? Register</a>
        </Box>
      </div>
    </div>
  );
}
