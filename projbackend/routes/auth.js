const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");

router.post(
  "/signup",
  [
    body("name", "name should be at least 3 char").isLength({ min: 3 }),
    body("email", "Email is invalid").isEmail(),
    body("password", "password should be at least 3 char long").isLength({
      min: 3,
    }),
  ],
  signup
);

router.post(
  "/signin",
  [
    body("email", "Email is invalid").isEmail(),
    body("password", "Password is required !!").isLength({ min: 1 }),
  ],
  signin
);

router.get("/signout", signout);

router.get('/testroute', isSignedIn, (req, res) => {
  res.send("The protected route !!")
})

module.exports = router;
