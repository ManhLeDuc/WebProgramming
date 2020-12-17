const express = require("express");
const wordController = require("../controllers/wordController");

const router = express.Router();

router.route("/regex/:wordRegex").get(wordController.getWordsByWordRegex);

router.route("/:word").get(wordController.getWordByWordName);

router.route("/:id").get(wordController.getWordById);

module.exports = router;
