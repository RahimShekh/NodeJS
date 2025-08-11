const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "harkirat123";

const app = express();
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
        message:"you are signed in"
    })
})

app.post("/signin",function(req,res){
    const username = req.body.username;
    const password = req.body.password;   

    let foundUser = null;

    for(let i = 0; i < users.length; i++)
    {
        if(users[i].username === username && users[i].password === password)
        {
            foundUser = users[i];
        }
    }
    if(!foundUser)
    {
        res.json({
            message:"credentials incorrect"
        })
        return;
    }
    else{
        const token = jwt.sign({
            username
        },JWT_SECRET);

        res.json({
            token:token
        })
    }
})

app.get("/me",function(req,res){
    const token = req.headers.token;

    const decodeData = jwt.verify(token,JWT_SECRET); // yaha pe jo token verify hoga or name return karega kyuki humne pehle username se hi token encrypt kiya hai

    const username = decodeData.username;
    let foundUser = null;
    if(decodeData.username)
    {
        

        for(let i=0; i < users.length; i++)
        {
            if(users[i].username === decodeData.username)
            {
                foundUser = users[i];
            }
        }
    }

    res.json({
        username : foundUser.username,
        password: foundUser.password
    })
})

app.listen(3000);