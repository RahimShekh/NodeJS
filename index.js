const express = require("express");

const app = express();


app.use(express.json());

const users = [];

// [
// {username: "harkirat,password:ilovekiara", token:"asdrw23343423423rdfsfsf"}
// ]

function generateToken()
{
    // return Math.random()     // random number generate karta

    //another best logic to genrate token will give a random String

    let options = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','z','x','y',
        'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','2','3',
        '4','5','6','7','8','9'];

        let token = "";   // empty string

        for(let i=0; i < 32; i++)
        {
            token = token + options[Math.floor(Math.random() * options.length)];
            
        }
        return token;

}
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
        const token = generateToken();  // calling token func to generate token
        foundUser.token = token;
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
    const token = req.headers.token;

    let foundUser = null;

    for(let i=0; i < users.length; i++)
    {
        if(users[i].token == token)
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

//math.random will give something from 0 & 9
            // math.random * options.length will give 0 => 42
            //math.floor   will give 11.2 to 11



            //find function to find users password and username

// const user = users.find(function(u){
//         if(u.username == username && u.password == password){
//             return true;
//         }
//         else{
//             return false;
//         }
//     });