const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "Not Able to save user in DB",
      });
    }
    res.json({
      name: user.name,
      lastname: user.lname,
      email: user.email,
      id: user._id,
    });
  });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      res.status(400).json({
        error: "User email doest not exists !!"
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and Password do not match !"
      });
    }

    //CREATE TOKEN
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    //PUT TOKEN IN COOKIE
    res.cookie("token", token, { expire: new Date() + 9999 });

    //SEND REAPOSE TO FRONT END
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie();
  res.json({
    message: "User Signout Successfully",
  });
};

//Protected Route
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  algorithms: ['HS256'],
  userProperty: "auth"
})
//Custom Middleware

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker){
    return res.status(403).json({
      error: "ACCESS DENIED"
    });
  }
  next();
}

exports.isAdmin = (req, res, next) => {
  if(req.profile.role === 0){
    return res.status(403).json({
      error: "You are not ADMIN, Access Denied !"
    })
  }
  next();
}