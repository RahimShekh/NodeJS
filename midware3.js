const express = require("express");
const app = express();

// app.use(middlewarre)                // global middlware
function middlewarre(req,res,next)  // middleware
{
    let icnt = 0
    icnt++;
    console.log("The count of route hitting:"+icnt);
    next();
    
}
app.get("/sum",middlewarre,function(req,res){
    
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