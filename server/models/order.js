const mongoose = require('mongoose')

const orderschema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    
        paypalOrderId: {
                type: String,
                require: true
        },
        totalAmount: {
            type: Number,
            require: true
        },
        status: {
            type: String,
            enum: ['pending','completed','failed']
        },
        createdAt:{
            type: Date,
            default: Date.now
        }

})

const ordermodel = mongoose.model('order_table',orderschema)

module.exports=ordermodel