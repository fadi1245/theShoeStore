const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productname: { type: String, required: true },
    productbrand: { type: String, required: true },
    productprice: { type: Number, required: true },
    productdescription: { type: String },
    productimgone: {
        data: Buffer,
        contentType: String,
    },
    productimgtwo: { 
        data: Buffer,
        contentType: String,
    },
    productimgthree: {
        data: Buffer,
        contentType: String,
    }
});

const ProductModel = mongoose.model('product_table', productSchema);

module.exports = ProductModel;
