const express = require('express')
const app = express();
const jwt = require('jsonwebtoken')
require('dotenv').config()

const {userRouter} = require ('./routes/user');
const { courseRouter } = require('./routes/course');
const { adminRouter } = require('./routes/admin');
app.use(express.json());

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URL);

app.use('/user' , userRouter);
app.use('/admin' , adminRouter);
app.use('/course' , courseRouter);


app.listen(3000 , () =>{
    console.log("App is listening on port 3000");   
});