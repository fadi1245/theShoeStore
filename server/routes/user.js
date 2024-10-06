const express = require('express')
const usermodel = require('../models/user')
const router = express.Router()
const JWT = require('jsonwebtoken')

const bcrypt= require('bcrypt')
const salt = bcrypt.genSalt;

router.post('/reg', async (req, res) => {
    try {
        const { fullname, email, age, password } = req.body;
        const record = await usermodel.find({ email: email.toLowerCase() });
        
        if (record.length > 0) {
            return res.status(400).json({ message: "Email already exists" });
        }
        
        const usercount = await usermodel.countDocuments({})
        const role = usercount==0 ? 'admin' : 'user';

        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);

        const userdata = { ...req.body, email: email.toLowerCase(), password: hashpassword ,role};

        await usermodel.create(userdata);
        res.status(201).json({ message: "Registered successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to register", error: err });
    }
});

router.post('/login',async(req,res)=>{
        const {email,password}=req.body
        const record= await usermodel.find({email:email.toLowerCase()})
        if(record.length>0){
            const dbpassword= record[0].password;
            bcrypt.compare(password,dbpassword,function(err,result){
                if(result){
                const token = JWT.sign({data:record},'ecome',{expiresIn:'1h'})
                res.json({status:1,msg:'login sucess',
            userid:record[0]._id,
            username:record[0].fullname,
            role: record[0].role,
            token:token
        })
        res.end()
                }
                else{
                    res.json({status:0,msg:"incorrect password"})
                }
            })
        }
        else{
            res.json({status:0,msg:"incorrect email"})
        }
})

module.exports=router