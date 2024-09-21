const express = require('express')
const app = express();
const jwt = require('jsonwebtoken')
const {userRouter} = require ('./routes/user');
const { courseRouter } = require('./routes/course');
app.use(express.json());

app.use('/user' , userRouter);
app.use('/course' , courseRouter);

app.listen(3000 , () =>{
    console.log("App is listening on port 3000");   
})