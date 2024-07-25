const User =require("../models/users.model"); 
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken');
require('dotenv').config();
async function signup(req,res){
const userDetails=req.body;
    
    try{
        if(!userDetails)throw Error("userDetails is required");
        const{username,name,email,password}=userDetails

        const salt=await bcrypt.genSalt(Number(process.env.SALT))
        const passwordHash=await bcrypt.hash(password,salt)
        console.log({passwordHash});

        const newUser=new User({
            username,
            name,
            email,
            password:passwordHash,
        })

        await newUser.save();
        res.status(201).json({success: 201, message:'user created successfully'})
    }catch(error){
        console.log({error});
        res.status(500).json({success: 500,message:`error in signup ${error}`})
}
}

async function signIn(req,res){
    const userDetails=req.body;
    try{
        if(!userDetails) throw Error("Login detils not found");
        const {email,password}=userDetails;

        const user=await User.findOne({email});
        if(!user) throw Error("User email not found");

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch) throw Error("Email or password is wrong");

        const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1d'});
        res.status(200).json({success:200 , token})

    }catch(error){
        res.status(500).json({
            success:500,
            message:`Error while login ${error}`,
        })
    }
}

module.exports ={
    signup,
    signIn
}