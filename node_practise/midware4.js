const express = require("express");
const app = express();

app.use(middleware);

function middleware(req,res,next)
{
    console.log("method is:"+req.method);
    console.log("host is:"+req.url); // hostname
    console.log(new Date());
    next();
}
app.get("/sum",function(req,res){
    
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        Sum : a + b
    })
})

app.get("/multiply",function(req,res){
    const a = req.query.a;
    const b = req.query.b;

    res.json({
        Multiply: a * b
    })
})

app.get("/divide",function(req,res){
    const a = req.query.a;
    const b = req.query.b;

    res.json({
        divide: a / b
    })
})

app.get("/subtract",function(req,res){
    const a = req.query.a;
    const b = req.query.b;

    res.json({
        Subtract: a - b
    })
})

app.listen(3000,function(){
    console.log("Sever is running");
})