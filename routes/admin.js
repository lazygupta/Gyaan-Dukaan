const {Router} = require('express')
const {adminModel, courseModel} = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 5;
const { adminAuth } = require('../middlewares/index')

const adminRouter= Router();

// Admin Signup working
adminRouter.post('/signup', async (req, res) => {
  const { email, password, firstname, lastname } = req.body;

  if (!email || !password) {
    res.status(401).json({
      message: "Username or Password can't be empty",
    });
  }

  try {
    bcrypt.hash(password, saltRounds, async function(err, hash) {
      await adminModel.create({
        email: email,
        password: hash,
        firstname,
        lastname
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
        process.env.JWT_ADMIN_SECRET
      );
      res.json({ 
        token,
        message: "You are signed in succesfully"
      }); 
    }
  });
  } catch (error) {
    res.status(401).json({
      message: "Something went Wrong"
    })
  }
});

adminRouter.post('/course' , adminAuth, async (req,res) => {
  const adminId = req.adminId;

  const { title, description , imageUrl, price} = req.body;
  try {
    const course = await courseModel.create({
      title,
      description,
      imageUrl,
      price,
      creatorId: adminId
    })
    res.json({
      message: "Course created",
      courseId: course._id
    })
  } catch (err) {
    res.json({
      Error: `${err}`
    })
  }
})

adminRouter.put('/course' ,(req,res) => {

})

adminRouter.get('/course/bulk' ,(req,res) => {

})

module.exports = {
    adminRouter: adminRouter
}