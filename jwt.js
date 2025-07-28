const express = require("express");
const jwt = require("jsonwebtoken")
const app = express();
const JWT_SECRET = "randomharkirat";

app.use(express.json());

const users = [];


app.post("/signup",function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username:username,
        password:password
    })

    res.json({
        message:"you are signed up"
    })

    console.log(users);
})

app.post("/signin",function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    let foundUser = null;

    for(let i=0; i < users.length; i++)
    {
        if(users[i].username == username && users[i].password == password)
        {
            foundUser = users[i];
        }
    }

    if(foundUser){
        const token = jwt.sign({
            username:username
        },JWT_SECRET); // calling their username over to a jwt
        // foundUser.token = token;
        res.json({
            message:token
        })
        
    }
    else{
        res.status(403).send({
            message:"Invalid username or password"
        })
    }
    console.log(users);
})


// this endpoint will give ur details if ur signed in
 app.get("/me",function(req,res){
    const token = req.headers.token; // jwt token
    const decodedInformation = jwt.verify(token,JWT_SECRET); // {usernmae:"harkiratgmail.com"}
    const username = decodedInformation.username;


    let foundUser = null;

    for(let i=0; i < users.length; i++)
    {
        if(users[i].username == username) // finding username not the token
        {
            foundUser = users[i];
        }
    }

    if(foundUser)
    {
        res.json({
            username:foundUser.username,
            password:foundUser.password
        })
    }
    else{
        res.json({
            messgae:"token invalid"
        })
    }
 })

app.listen(3000); // http serverr listeing on port 3000

