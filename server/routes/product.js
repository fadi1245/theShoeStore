const express = require('express');
const producttable = require('../models/product'); // Ensure this path is correct
const router = express.Router();
const multer = require('multer');
const userModel = require('../models/user');

// Configure multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
}).fields([
    { name: 'productimgone', maxCount: 1 },
    { name: 'productimgtwo', maxCount: 1 },
    { name: 'productimgthree', maxCount: 1 }
]);

// Define the POST route for uploading products
router.post('/uploadproduct', upload, async (req, res) => {
    try {
        // Extract text fields from req.body
        const { productname, productprice, productbrand, productdescription } = req.body;

        // Handle image data from req.files
        const productimgone = req.files['productimgone'] ? {
            data: req.files['productimgone'][0].buffer,
            contentType: req.files['productimgone'][0].mimetype,
        } : null;

        const productimgtwo = req.files['productimgtwo'] ? {
            data: req.files['productimgtwo'][0].buffer,
            contentType: req.files['productimgtwo'][0].mimetype,
        } : null;

        const productimgthree = req.files['productimgthree'] ? {
            data: req.files['productimgthree'][0].buffer,
            contentType: req.files['productimgthree'][0].mimetype,
        } : null;

        // Create a new product instance with the provided data
        const newProduct = new producttable({
            productname,
            productprice,
            productbrand,
            productdescription,
            productimgone,
            productimgtwo,
            productimgthree,
        });

        // Save the product to the database
        await newProduct.save();

        // Send success response
        res.json({ message: 'Product uploaded successfully!', product: newProduct });
    } catch (error) {
        // Log and return error response
        console.error('Error uploading product:', error);
        res.status(500).json({ message: 'Failed to upload product.', error });
    }
});

// Get all products
router.get('/getproduct', async (req, res) => {
    try {
        const productss = await producttable.find();
        const productswithimages = productss.map(product => ({
            ...product.toObject(),
            productimgone: product.productimgone ? `data:${product.productimgone.contentType};base64,${product.productimgone.data.toString('base64')}` : null,
            productimgtwo: product.productimgtwo ? `data:${product.productimgtwo.contentType};base64,${product.productimgtwo.data.toString('base64')}` : null,
            productimgthree: product.productimgthree ? `data:${product.productimgthree.contentType};base64,${product.productimgthree.data.toString('base64')}` : null
        }));
        res.json(productswithimages);
    } catch (err) {
        console.log("Error fetching products:", err);
        res.status(500).json({ message: 'Failed to fetch products', err });
    }
});

// Get product by ID
router.get('/getbyid/:id', async (req, res) => {
    try {
        const products = await producttable.findById(req.params.id);
        if (!products) {
            return res.status(400).json({ message: "Product not found" });
        }
        const productwithimage = {
            ...products.toObject(),
            productimgone: products.productimgone ? `data:${products.productimgone.contentType};base64,${products.productimgone.data.toString('base64')}` : null,
            productimgtwo: products.productimgtwo ? `data:${products.productimgtwo.contentType};base64,${products.productimgtwo.data.toString('base64')}` : null,
            productimgthree: products.productimgthree ? `data:${products.productimgthree.contentType};base64,${products.productimgthree.data.toString('base64')}` : null,
        };
        res.json(productwithimage);
    } catch (err) {
        console.log("Error fetching product:", err);
        res.status(400).json({ message: "Failed to fetch", err });
    }
});

// Add item to cart
router.post('/cartadd', async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const user = await userModel.findById(userId);
        if (!user) return res.status(404).json({ msg: "User not found" });

        const cartItem = user.cart.find(item => item.productId.toString() === productId);
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            user.cart.push({ productId, quantity: 1 }); // Add quantity
        }

        await user.save();
        res.status(200).json({ msg: "Item added to cart", cart: user.cart });
    } catch (err) {
        console.error('Error adding to cart:', err);
        res.status(500).json({ msg: "Error adding to cart", error: err });
    }
});

// Get cart items for a user
router.get('/cartget', async (req, res) => {
    const userId = req.headers.userid; // Retrieve userId from headers
    console.log(userId,"iddddddddd");
    try {
        // const user = await userModel.findById(userId).populate('cart.productId');
        const user = await userModel.findById(userId);
        console.log(user,"uuuuuuu");
        console.log(user.email,"userrrrrrrr");
        if (!user) {
            console.error(`User not found for ID: ${userId}`);
            return res.status(404).json({ message: "User not found" });
        }

        if (!user.cart || user.cart.length === 0) {  
            console.error('User cart is empty');
            return res.status(200).json([]); // Return empty array if no items in cart
        }
        console.log("dvcad");
        console.log('User cart retrieved:', user.cart); // Log the cart contents
        res.send(user.cart); // Send back user's cart
    } catch (error) {
        console.error('Error retrieving cart data:', error);
        res.status(500).json({ message: "Error retrieving cart data", error });
    }
});

// Remove item from cart
router.post('/cartremove', async (req, res) => {
    const { userId, productId } = req.body;
    try {
        const user = await userModel.findById(userId);
        const cartItems = user.cart.find(item => item.productId.toString() === productId);
        if (cartItems) {
            cartItems.quantity -= 1;
            if (cartItems.quantity === 0) {
                user.cart = user.cart.filter(item => item.productId.toString() !== productId);
            }
            await user.save();
            res.status(200).json({ msg: "Quantity decreased" });
        } else {
            res.status(500).json({ msg: "Product not found" });
        }
    } catch (err) {
        res.status(500).json({ msg: "Error updating data", err });
    }
});

// Clear cart
router.delete('/clearcart', async (req, res) => {
    const userId = req.headers.userid;
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }
        user.cart = [];
        await user.save();
        res.status(200).json({ msg: "Cart cleared" });
    } catch (err) {
        res.status(500).json({ msg: "Error clearing cart", err });
    }
});

router.delete('/deletprod/:id',async(req,res)=>{
    const prodid=req.params.id;
    try{await producttable.deleteOne({_id:prodid})
    res.status(200).json({msg:"product deleted"})}
    catch(err){
        res.status(500).json({msg:"product not deleted",err})
    }
})

router.put('/update',async(req,res)=>{
    const id= req.headers.taskid;
    await producttable.updateOne({_id:id},req.body)
})

module.exports = router;
