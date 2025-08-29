//other way of writing
// const express = require("express");
// const Router = express.Router;

const { Router } = require("express");
const { userModel, purchaseModel, courseModel } = require("../db");
const userRouter = Router();
const jwt = require("jsonwebtoken");
const {JWT_USER_PASSWORD} = require("../config")
const {userMiddleware} = require("../middleware/user");

userRouter.post("/signup",async function(req,res){
    const {email,password,firstname,lastname} = req.body;  // add zod validation
    //hash the password
    await userModel.create({
        email:email,
        password:password,
        firsname:firstname,
        lastname:lastname
    })

    res.json({
        message:"signup success "
    })
})

//ideally password should be hashed
userRouter.post("/signin",async function(req,res){
    const{email,password} = req.body;

    const user = await userModel.findOne({
        email:email,
        password:password
    })
    if(user)
    {
        const token = jwt.sign({
            id:user._id
        },JWT_USER_PASSWORD);

        res.json({
            token:token
        })
    }
    else{
        res.status(403).json({
            message:"Incorrect Credentials"
        })
    }
    //try cookie authentication
})

userRouter.get("/purchases",userMiddleware,async function(req,res){
    const userId = req.userId;

    const purchases = await purchaseModel.find({
        userId
    })
    const courseData = await courseModel.find({
        _id:{ $in:purchases.map(x => x._courseId)}
    })
    res.json({
        purchases,
        courseData
    })
})

module.exports = {
    userRouter: userRouter
}

//bydefault /user/signup will get add bcuz of router