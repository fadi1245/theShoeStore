const express =require('express')
const router = express.Router()
require('dotenv').config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

// app.use(express.static(process.env.STATIC_DIR));

router.get('/config',(req,res)=>{
    res.send({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    })
})

router.post("/create-payment-intent", async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            currency: "EUR", // Make sure this matches the currency you are using
            amount: req.body.amount, // Ensure that amount is passed from the frontend
            automatic_payment_methods: { enabled: true }, // Corrected key
        });
        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (err) {
        console.error("Error creating payment intent:", err); // Log detailed error
        return res.status(400).send({ msg: "Error creating payment intent", err });
    }
});


module.exports=router