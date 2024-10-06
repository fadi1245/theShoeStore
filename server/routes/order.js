const express = require('express')
const  router = express.Router()

const ordertable = require('../models/order')

router.post('/create-order',async(req,res)=>{
    const {userId,totalAmount,paypalOrderId}= req.body

    try{
        const newOrder = await ordertable.create({
            userId,totalAmount,paypalOrderId,
            status:'pending'
        })
        res.status(201).json({success: true, order: newOrder})
    }
    catch(err){
        res.status(500).json({msg:"server error" , success: false})
    }
})



module.exports=router