const mongoose = require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.MONGO_URL).then(
    res=>{
         console.log("connnected sucsessfully")
    }
)
.catch(err=>{
    console.log("connection failed",err)
})