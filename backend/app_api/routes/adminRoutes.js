const express = require("express");
const mongoose = require("mongoose");

const authController = require("../controllers/authController");
const adminController = require("../controllers/adminController");

const router = express.Router();

//-----------------------------------------
const jwt = require("express-jwt");

// INstantiating the express-jwt middleware
const auth = jwt({
  secret: process.env.JWT_ADMIN_SECRET,
  userProperty: "payload",
  algorithms: ["sha1", "RS256", "HS256"],
});
//-----------------------------------------

router.route("/me").get(
  auth,
  (req, res, next) => {
    res.send("You are authenticated as a admin");
    next();
  },
  adminController.getAdminInfo
);

router.post("/register", authController.adminRegister);
router.post("/login", authController.adminLogin);

module.exports = router;
