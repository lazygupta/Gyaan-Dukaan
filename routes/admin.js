const {Router} = require('express')

const adminRouter= Router();

adminRouter.post("/signup", (req, res) => {
    const {username, password} = req.body;
  
  });
  
adminRouter.post("/signin", (req, res) => {
    res.json({
      message: "Signin endpoint",
    });
  });

adminRouter.post('/course' ,(req,res) => {

})

module.exports = {
    adminRouter: adminRouter
}