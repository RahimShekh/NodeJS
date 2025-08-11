const express = require("express");
const app = express();

const users =[{
    name:"ram",
    kidneys:[{
        healthy:false,
    }]
}]

app.use(express.json());


app.get('/',function(req,res){

    const ramKidneys = users[0].kidneys;
    const totalKidneys = ramKidneys.length;

    let healthykidney = 0;

    for(let i = 0; i < ramKidneys.length; i++)
    {
        if(ramKidneys[i].healthy )
        {
            healthykidney = healthykidney + 1;
        }
    }
    const unHealthykidney = totalKidneys - healthykidney;

    res.json({
        totalKidneys,
        healthykidney,
        unHealthykidney
    })
})

app.post('/',function(req,res)
{
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy:isHealthy
    })

    res.json({
        msg:"done"
    })
})

//updating
app.put('/',function(req,res)
{
    for(let i = 0; i < users[0].kidneys.length; i++)
    {
        users[0].kidneys[i].healthy = true;
        
    }
    res.json({});
})

app.delete('/',function(req, res)
{
    const newArr = [];

    for(let i=0; i < users[0].kidneys.length;i++)
    {
        if(users[0].kidneys[i].healthy)
        {
            newArr.push({
                healthy:true
            })
        }
    }
    users[0].kidneys = newArr;
    res.json({msg:"done"})
})
app.listen(3000);