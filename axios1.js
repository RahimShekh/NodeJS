const axios = require("axios");

async function main() {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts/1");
    //response.data

    console.log(response.data);
}

main();

// we dont have to tell it is json data or text data it will understand automatically
// we can send get, post , put , delete