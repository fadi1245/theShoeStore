import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react'
export default function Checkout() {
    const stripe = useStripe();
    const elements = useElements();

    const [messege, setmessege] = useState(null)
    const [isprocessing, setisprocessing]= useState(false)

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!stripe || !elements) { // Corrected condition check
          return;
      }
      setisprocessing(true);
  
      const { error } = await stripe.confirmPayment({
          elements,
          confirmParams: {
              return_url: `${window.location.origin}/success`
          }
      });
      
      if (error) {
          setmessege(error.message);
      } else {
          setmessege("Payment successful!");
      }
  
      setisprocessing(false);
  };
  

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button disabled={isprocessing || !stripe || !elements} id="submit">
        <span id="button-text">
          {isprocessing ? "Processing ... " : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {messege && <div id="payment-message">{messege}</div>}
    </form>
  )
}
