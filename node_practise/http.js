const express = require("express");
const app = express()

//get method

app.get('/', function(req,res){
    res.send("hello Rahim")
})

//post method
app.post('/poko', function(req,res){
    res.send("hello from poko")
})
app.listen(3000) 

// request response