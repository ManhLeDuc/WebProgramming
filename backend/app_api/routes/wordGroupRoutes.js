const express = require("express");

const wordGroupController = require("../controllers/wordGroupController");

const router = express.Router();

//-----------------------------------------
const jwt = require("express-jwt");

// INstantiating the express-jwt middleware
const authRegularUser = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: "payload",
  algorithms: ["sha1", "RS256", "HS256"],
});
//-----------------------------------------

router
  .route("/")
  .get(
    authRegularUser,
    (req, res, next) => {
      res.send("You are authenticated");
      next();
    },
    wordGroupController.getAllWordGroups
  )
  .post(
    authRegularUser,
    (req, res, next) => {
      res.send("You are authenticated");
      next();
    },
    wordGroupController.createWordGroup
  );

router
  .route("/:wordGroupId")
  .get(
    authRegularUser,
    (req, res, next) => {
      res.send("You are authenticated");
      next();
    },
    wordGroupController.authOwnerWordGroup,
    wordGroupController.getWordGroup
  )
  .patch(
    authRegularUser,
    (req, res, next) => {
      res.send("You are authenticated");
      next();
    },
    wordGroupController.authOwnerWordGroup,
    wordGroupController.updateWordGroup
  )
  .delete(
    authRegularUser,
    (req, res, next) => {
      res.send("You are authenticated");
      next();
    },
    wordGroupController.authOwnerWordGroup,
    wordGroupController.deleteWordGroup
  );

router
  .route("/:wordGroupId/words/:wordId")
  .get(
    authRegularUser,
    (req, res, next) => {
      res.send("You are authenticated");
      next();
    },
    wordGroupController.authOwnerWordGroup,
    wordGroupController.wordIdIfExist,
    wordGroupController.getWordFromGroup
  )
  .patch(
    authRegularUser,
    (req, res, next) => {
      res.send("You are authenticated");
      next();
    },
    wordGroupController.authOwnerWordGroup,
    wordGroupController.wordIdIfExist,
    wordGroupController.addWordToGroup
  )
  .delete(
    authRegularUser,
    (req, res, next) => {
      res.send("You are authenticated");
      next();
    },
    wordGroupController.authOwnerWordGroup,
    wordGroupController.wordIdIfExist,
    wordGroupController.deleteWordFromGroup
  );

module.exports = router;
