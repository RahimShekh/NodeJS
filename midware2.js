const express = require("express");

const app = express();

function isOldEngoughMiddleware(req,res,next)
{
    const age = req.query.age;
    if(age >= 14)
    {
        next();
    }
    else{
        res.status(411).json({
            msg:"sorry u dont hae the right age to ride"
        })
    }
}
app.get('/ride1',isOldEngoughMiddleware,function(req,res)
{
         res.json({
        msg:"you have sucessfully ride the ride1"
    })
});

app.get('/ride2',isOldEngoughMiddleware,function(req,res)
{
     res.json({
        msg:"you have sucessfully ride the ride2"
    })
})
app.listen(3001);