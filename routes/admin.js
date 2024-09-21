const {Router} = require('express')
const {adminModel} = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 5;

const adminRouter= Router();

// Admin Signup working
adminRouter.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401).json({
      message: "Username or Password can't be empty",
    });
  }

  try {
    bcrypt.hash(password, saltRounds, function(err, hash) {
      adminModel.create({
        email: email,
        password: hash
      });
    });
    
    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    console.log("Cannot create User", error);
  }
  
});

// Admin Signin working correctly
adminRouter.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401).json({
      message: "Username or Password can't be empty",
    });
  }

  try {
    const admin = await adminModel.findOne({ email });

    if (!admin) {
      res.status(401).json({
        message: "Invalid credentials",
      });
    }

    bcrypt.compare(password, admin.password , function(err, result) {
      if(err) {
        res.status(401).json({
          message: "Wrong Password",
        });
      } else {
      let token = jwt.sign(
        {
          id: admin._id,
          role: "user",
        },
        process.env.JWT_SECRET
      );
      res.json({ 
        token
      }); 
    }
  });
  } catch (error) {
    res.status(401).json({
      message: "Something went Wrong"
    })
  }
});

adminRouter.post('/course' ,(req,res) => {

})

module.exports = {
    adminRouter: adminRouter
}