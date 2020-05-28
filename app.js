const express = require('express');
const app = express();
const port = process.env.port || 3000;

app.get('/', (req,res) => {
    res.send("Welcome to ContactBook!!");
})

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`);
})