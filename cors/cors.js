const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());  // middlware inbuilt
app.use(cors());              // another middleware

app.post("/sum", function(req,res){
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);

    res.json({
        answer: a+b
    })
})

app.listen(3000);

// command - npx serve
// serves a folder over http
//using th cors middleware we can access another domain