import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import pr from '../payment/payment.module.css';
import Checkout from './checkout';

export default function PaymentPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const totalAmount = location.state?.totalAmount || 0;
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        axios.get('http://localhost:7000/checkout/config').then(async (r) => {
            const { publishableKey } = r.data;
            setStripePromise(loadStripe(publishableKey));
        }).catch(error => {
            console.error("Error fetching publishable key:", error);
        });
    }, []);

    useEffect(() => {
        axios.post('http://localhost:7000/checkout/create-payment-intent', {
            amount: (totalAmount) * 100
        }).then(async (r) => {
            const { clientSecret } = r.data;
            setClientSecret(clientSecret);
        }).catch(error => {
            console.error("Error creating payment intent:", error);
        });
    }, [totalAmount]);

    return (
        <div className={pr.main}>
            <div className={pr.outerbox}>
                <Box className={pr.leftbox}>
                    <h3 style={{ textDecoration: 'underline' }}>Order Summary</h3>
                    <p>Total: ${totalAmount.toFixed(2)}</p>
                    <p>Shipping charge: $50.00</p>
                    <p>Convenience charge: $30.00</p>
                    <h2>Subtotal: ${(totalAmount + 50 + 30).toFixed(2)}</h2>
                    <button onClick={() => navigate('/cart')}>Back to cart</button>
                </Box>
                <Box className={pr.rightbox}>
                    {stripePromise && clientSecret && (
                        <Elements stripe={stripePromise} options={{ clientSecret }}>
                            <Checkout />
                        </Elements>
                    )}
                </Box>
            </div>
        </div>
    );
}
