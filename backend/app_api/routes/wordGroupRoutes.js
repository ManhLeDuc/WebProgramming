const express = require("express");

const wordGroupController = require("../controllers/wordGroupController");

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

router
  .route("/")
  .get(
    auth,
    (req, res, next) => {
      res.send("You are authenticated");
      next();
    },
    wordGroupController.getAllWordGroups
  )
  .put(
    auth,
    (req, res, next) => {
      res.send("You are authenticated");
      next();
    },
    wordGroupController.createWordGroup
  );

router
  .route("/:wordGroupId")
  .get(
    auth,
    (req, res, next) => {
      res.send("You are authenticated");
      next();
    },
    wordGroupController.authOwnerWordGroup,
    wordGroupController.getWordGroup
  )
  .put(
    auth,
    (req, res, next) => {
      res.send("You are authenticated");
      next();
    },
    wordGroupController.authOwnerWordGroup,
    wordGroupController.updateWordGroup
  )
  .delete(
    auth,
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
    auth,
    (req, res, next) => {
      res.send("You are authenticated");
      next();
    },
    wordGroupController.authOwnerWordGroup,
    wordGroupController.validateWordId,
    wordGroupController.getWordFromGroup
  )
  .put(
    auth,
    (req, res, next) => {
      res.send("You are authenticated");
      next();
    },
    wordGroupController.authOwnerWordGroup,
    wordGroupController.validateWordId,
    wordGroupController.addWordToGroup
  )
  .delete(
    auth,
    (req, res, next) => {
      res.send("You are authenticated");
      next();
    },
    wordGroupController.authOwnerWordGroup,
    wordGroupController.validateWordId,
    wordGroupController.deleteWordFromGroup
  );

module.exports = router;
