const express = require('express')
const app = express();
const jwt = require('jsonwebtoken')

app.use(express.json());

app.post('user/signup' , (req,res) => {
    res.json({
        message: "Signup endpoint"
    })
})

app.post('user/signin' , (req,res) => {
    res.json({
        message: "Signin endpoint"
    })
})

app.get('/user/purchases' , (req,res) => {
    res.json({
        message: "User Purchases endpoint"
    })
})

app.get('/courses/purchases' , (req,res) =>{
    res.json({
        message: "User courses Purchases endpoint"
    })
})

app.get('/courses' ,(req,res) =>{
    res.json({
        message: "courses endpoint"
    })
})

app.listen(3000 , () =>{
    console.log("App is listening on port 3000");   
})