function add(a,b)
{
    return a+b;
}

function sub(a, b)
{
    return a-b;
}

// module.exports ="rahim"
//module.exports = add;
//module.exports = sub;   // if u use this type the add method will overwrite with sub

// multiple exports kar sakte
module.exports ={
    add,
    sub
}

// rename bhi kar sakte

// module.exports ={
//     Sum :add,
//     Minus :sub
// }

