const { Router } = require("express");
const { userModel } = require("../db");
const userRouter = Router();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URL);
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 5;

// Signup working fine
userRouter.post("/signup", (req, res) => {
  const { email, password, firstname, lastname } = req.body;

  if (!email || !password || !firstname) {
    res.status(401).json({
      message: "Username or Password can't be empty",
    });
  }

  try {
    bcrypt.hash(password, saltRounds, async function(err, hash) {
      await userModel.create({
        email: email,
        password: hash,
        firstname,
        lastname
      });
    });
    
    res.status(401).json({
      message: "User Created Succesfully",
    });
  } catch (error) {
    console.log("Cannot create User", error);
  }
});

// Signin working fine
userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401).json({
      message: "Username or Password can't be empty",
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      res.status(401).json({
        message: "Invalid credentials",
      });
    }

    bcrypt.compare(password, user.password , function(err, result) {
      if(!result) {
        res.status(401).json({
          message: "Wrong Password",
        });
      } else {
      const token = jwt.sign(
        {
          id: user._id,
          role: "user",
        },
        process.env.JWT_USER_SECRET
      );

      // Do cookie logic - assignment

      res.setHeader('token', token);

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

userRouter.get("/purchases", (req, res) => {
  res.json({
    message: "User Purchases endpoint",
  });
});


module.exports = {
  userRouter: userRouter,
};
