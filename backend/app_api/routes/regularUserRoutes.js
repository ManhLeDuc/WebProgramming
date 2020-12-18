const express = require("express");

const authController = require("../controllers/authController");
const userController = require("../controllers/regularUserController");

const router = express.Router();
//-----------------------------------------
const jwt = require("express-jwt");

// INstantiating the express-jwt middleware
const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: "payload",
  algorithms: ["sha1", "RS256", "HS256"],
});
//-----------------------------------------

router.route("/me").get(auth, userController.getUserInfo);

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
