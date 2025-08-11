const express = require("express");
const {UserModel, TodoModel} = require("./db");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const{ z } = require("zod");

const JWT_SECRET = "asffeff123";
const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://rahimshekh46751:Rahim$k786@cluster0.nflbjmw.mongodb.net/todo2")


app.post('/signup',async function(req,res){     // async is liye kare user agar login karega toh yatoh error return karto ya phir login return karo
    const requiredBody = z.object({
        email : z.string().min(3).max(100).email(),
        name : z.string().min(3).max(100),
        password: z.string().min(3).max(30),
    })

    const parseDatawithSucess = requiredBody.safeParse(req.body);

    if(!parseDatawithSucess.success){
        res.json({
            message : " incorrect format",
            error : parseDatawithSucess.error
        })
        return;
    }
    const email = req.body.email;               // agar boh sync hoga toh user bolega login toh batara lekin login nhi hua
    const password = req.body.password;
    const name = req.body.name;
    let errorThrown = false;
    
    try{
    const hashedPassword = await bcrypt.hash(password, 5); // it can take and promise also we took promise
    console.log(hashedPassword);
     
    await UserModel.create({
        email: email,
        password: hashedPassword,
        name: name
    })
    } catch(e){
        res.json({
            message:"user already exists"
        })
        errorThrown = true;
    }

    if(!errorThrown)
    {
        res.json({
        message: " you are signed up"
    })
    }
});

app.post('/signin',async function(req,res){   // we have to check the user exists or not

    const email = req.body.email;
    const password = req.body.password;

    const response = await UserModel.find({
        email: email
    })

    if(!response)
    {
        res.status(403).json({
            message:"user does not exist in our db"
        })
        return;
    }
    const passwordMatch = await bcrypt.compare(password, response.password);  // hashed password
    if(passwordMatch)
    {
        const token = jwt.sign({
            id: response._id.toString()
        },JWT_SECRET)
        res.json({
            token
        });
    }
    else
    {
        res.status(403).json({
            message: " incorrect details"
        });
    }
})

app.post('/todo',auth,function(req,res){
    const userId = req.userId;
    const title = req.body.title;

    TodoModel.create({
        title,
        userId
    })
    res.json({
        userId: userId
    })
})

app.get('/todos',auth,async function(req,res){ 
    const userId = req.userId;
    const todos = await TodoModel.find({
        userId : userId
    })
    res.json({
        todos
    })
})

function auth(req,res,next){
    const token = req.headers.token;

    const decodeData = jwt.verify(token,JWT_SECRET);

    if(decodeData)
    {
        req.userId = decodeData.id;
        next();
    }
    else{
        res.status(403).json({
            message:"incorrect details"
        })
    }
}

app.listen(3000);

//usermodel promise return kar rha ya to voh create karega ya phir fail hoga