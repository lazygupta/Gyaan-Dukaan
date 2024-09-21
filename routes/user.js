const { Router } = require("express");

const userRouter = Router();

userRouter.post("/signup", (req, res) => {
  const {username, password} = req.body;

});

userRouter.post("/signin", (req, res) => {
  res.json({
    message: "Signin endpoint",
  });
});

userRouter.get("/purchases", (req, res) => {
  res.json({
    message: "User Purchases endpoint",
  });
});

module.exports = {
  userRouter: userRouter,
};