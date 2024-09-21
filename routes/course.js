const {Router} = require('express')

const courseRouter = Router();

courseRouter.post('/purchases' , (req,res) =>{
    res.json({
        message: "User courses Purchases endpoint"
    })
})

courseRouter.get('/preview' ,(req,res) =>{
    res.json({
        message: "courses endpoint"
    })
})

module.exports = {
    courseRouter: courseRouter
}