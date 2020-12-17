const express = require("express");
const router = express.Router();
const ctrlWords = require("../../app_api/controllers/wordController");
const ctrlOthers = require("../../app_api/controllers/aboutController");

router.get("/", ctrlWords.getWordsByWordRegex);

router.get("/about", ctrlOthers.about);

module.exports = router;
