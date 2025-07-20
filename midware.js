const express = require("express");

const app = express();

function isOldEngough(age)
{
    if(age >= 14)
    {
        return true;
    }
    else{
        return false;
    }
}
app.get('/ride1',function(req,res)
{
    if(isOldEngough(req.query.age))
    {
        res.json({
        msg:"you have sucessfully ride the ride1"
    })
    }
    else
    {
        res.status(411).json({
            msg:"sorry u dont hae the right age to ride"
        })
    }
   
});

app.get('/ride2',function(req,res)
{
    if(isOldEngough(req.query.age))
    {
        res.json({
        msg:"you have sucessfully ride the ride2"
    })
    }
    else
    {
        res.status(411).json({
            msg:"sorry u dont hae the right age to ride"
        })
    }
   
})
app.listen(3001);