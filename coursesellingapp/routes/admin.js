const{ Router } = require("express");
const adminRouter = Router();
const {adminModel, courseModel} = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_ADMIN_PASSWORD} = require("../config");
const{adminMiddleware} = require("../middleware/admin");
//use bcrypt,zod,jsonwebtoken

adminRouter.post("/signup",async function(req,res){
    const {email,password,firstname,lastname} = req.body;

    await adminModel.create({
        email:email,
        password:password,
        firstname:firstname,
        lastname:lastname
    })
    res.json({
        message:"signup succeeded"
    })
})

adminRouter.post("/signin",async function(req,res){
    const {email,password} = req.body;

    const admin = await adminModel.findOne({
        email:email,
        password:password
    })

    if(admin)
    {
        const token = jwt.sign({
            id:admin._id
        },JWT_ADMIN_PASSWORD);

        res.json({
            token:token
        })
    }
    else{
        res.status(403).json({
            message:"Incorrect credentials"
        })
    }
})

adminRouter.post("/course",adminMiddleware,async function(req,res){
    const adminId = req.userId;

    const {title,description,imageUrl,price} = req.body;

    const course = await courseModel.create({
        title,description,imageUrl,price,creatorId: adminId
    })

    res.json({
        message:"course created",
        courseId: course._id
    })
})

//edit course
adminRouter.put("/course",adminMiddleware,async function(req,res){
   const adminId = req.userId;

   const{title,description,imageUrl,price,courseId} = req.body;
    //check the creators id and courseid flying beast
   const course = await courseModel.updateOne({
        _id:courseId,
        creatorId:adminId
   },{
        title:title,
        description:description,
        imageUrl:imageUrl,
        price:price,
        // creatorId:creatorId
   })
    res.json({
       message:"course updated",
       courseId: course._id
   })
})

adminRouter.get("/course/bulk",adminMiddleware,async function(req,res){
    const adminId = req.userId;

    const courses = await courseModel.find({
        creatorId:adminId
    });

    res.json({
        message:"course update",
        courses  
    })
})

module.exports = {
    adminRouter:adminRouter
}