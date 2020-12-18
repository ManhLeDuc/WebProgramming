const express = require("express");
const wordController = require("../controllers/wordController");

const router = express.Router();

//-----------------------------------------
const jwt = require("express-jwt");

// INstantiating the express-jwt middleware
const authAdmin = jwt({
  secret: process.env.JWT_ADMIN_SECRET,
  userProperty: "payload",
  algorithms: ["sha1", "RS256", "HS256"],
});
//-----------------------------------------

router.route("/").post(
  authAdmin,
  (req, res, next) => {
    res.send("You are authenticated as an admin");
    next();
  },
  wordController.addWord
);

router.route("/regex/:wordRegex").get(wordController.getWordsByWordRegex);

router.route("/:word").get(wordController.getWordByWordName);

router
  .route("/:id")
  .get(wordController.wordIdIfExist, wordController.getWordById)
  .patch(
    authAdmin,
    (req, res, next) => {
      res.send("You are authenticated as an admin");
      next();
    },
    wordController.wordIdIfExist,
    wordController.updateWord
  )
  .delete(
    authAdmin,
    (req, res, next) => {
      res.send("You are authenticated as an admin");
      next();
    },
    wordController.wordIdIfExist,
    wordController.deleteWord
  );

module.exports = router;
