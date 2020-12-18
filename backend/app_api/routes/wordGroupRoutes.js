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
  .get(authRegularUser, wordGroupController.getAllWordGroups)
  .post(authRegularUser, wordGroupController.createWordGroup);

router
  .route("/:wordGroupId")
  .get(
    authRegularUser,
    wordGroupController.authOwnerWordGroup,
    wordGroupController.getWordGroup
  )
  .put(
    authRegularUser,
    wordGroupController.authOwnerWordGroup,
    wordGroupController.updateWordGroup
  )
  .delete(
    authRegularUser,
    wordGroupController.authOwnerWordGroup,
    wordGroupController.deleteWordGroup
  );

router
  .route("/:wordGroupId/words/:wordId")
  .get(
    authRegularUser,
    wordGroupController.authOwnerWordGroup,
    wordGroupController.wordIdIfExist,
    wordGroupController.getWordFromGroup
  )
  .put(
    authRegularUser,
    wordGroupController.authOwnerWordGroup,
    wordGroupController.wordIdIfExist,
    wordGroupController.addWordToGroup
  )
  .delete(
    authRegularUser,
    wordGroupController.authOwnerWordGroup,
    wordGroupController.wordIdIfExist,
    wordGroupController.deleteWordFromGroup
  );

module.exports = router;
