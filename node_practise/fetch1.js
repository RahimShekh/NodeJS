function main()
{
    fetch("https://jsonplaceholder.typicode.com/posts/1")// url is wrong
    .then(async response => {
        const json = await response.json();
        console.log(json);
        //await response.text();
    })
}

// async function main()
// {
//     const response = await fetch("");
//     const json = await response.json();
//     console.log(json.todos.length);
// }

main();