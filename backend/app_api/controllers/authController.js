const passport = require("passport");

const RegularUser = require("../models/regularUserModel");
const Admin = require("../models/adminModel");

const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

exports.register = (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: "All fields required" });
  }

  if (!emailRegex.test(req.body.email)) {
    res.status(400).json({
      message: "Invalid email adress",
    });
  } else if (req.body.password.length < 6) {
    res.status(400).json({
      message: "Password must be at least 6 characters",
    });
  } else {
    const newUser = new RegularUser();
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    newUser.setPassword(req.body.password);
    newUser.save((err) => {
      if (err) {
        res.status(400).json(err);
      } else {
        const token = newUser.generateJwt();
        res.status(200).json({ token });
      }
    });
  }
};

exports.login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "All fields required" });
  }
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(404).json(err);
    }
    if (user) {
      const token = user.generateJwt();
      res.status(200).json({ token });
    } else {
      res.status(401).json(info);
    }
  })(req, res);
};

exports.adminRegister = (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.code
  ) {
    return res.status(400).json({ message: "All fields required" });
  }

  if (!emailRegex.test(req.body.email)) {
    res.status(400).json({
      message: "Invalid email adress",
    });
  } else if (req.body.password.length < 8) {
    res.status(400).json({
      message: "Password must be at least 8 characters",
    });
  } else if (req.body.code != process.env.JWT_SECRET) {
    res.status(401).json({
      message: "Wrong code",
    });
  } else {
    const newAdmin = new Admin();
    newAdmin.name = req.body.name;
    newAdmin.email = req.body.email;
    newAdmin.setPassword(req.body.password);
    newAdmin.save((err) => {
      if (err) {
        res.status(400).json(err);
      } else {
        const token = newAdmin.generateJwt();
        res.status(200).json({ token });
      }
    });
  }
};

exports.adminLogin = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "All fields required" });
  }
  passport.authenticate("local", (err, admin, info) => {
    if (err) {
      return res.status(404).json(err);
    }
    if (admin) {
      const token = admin.generateJwt();
      res.status(200).json({ token });
    } else {
      res.status(401).json(info);
    }
  })(req, res);
};
