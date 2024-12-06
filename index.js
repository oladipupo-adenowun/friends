const express = require('express');
const userRoute = require('./routes/users.js');
const app = express();
const PORT = 5000;

//use JSON parsing middleware and user route
app.use(express.json());
app.use("/user",userRoute);

app.listen(PORT,()=>{
    console.log("Server is running at PORT "+PORT);
})