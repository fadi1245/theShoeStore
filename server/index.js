const express = require('express')
const app=express()
const cors = require('cors')
require('dotenv').config()
app.listen(process.env.PORT)
console.log("server running in " + process.env.PORT)
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

const db = require('./common/dbconnection')

const productrouter = require('./routes/product')
const userrouter = require('./routes/user')
const orderrouter = require('./routes/order')
const paymentrouter = require('./routes/payment')


app.use('/product',productrouter)
app.use('/user',userrouter)
app.use('/orders',orderrouter)
app.use('/checkout',paymentrouter)