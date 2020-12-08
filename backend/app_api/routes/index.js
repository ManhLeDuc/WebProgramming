const express = require('express');
const router = express.Router();
const ctrlWords = require('../controllers/words');

router
  .route('/wordsByRegex/:word')
  .get(ctrlWords.wordsByRegex)

router
  .route('/wordByName/:wordName')
  .get(ctrlWords.wordByName)

router
  .route('/wordById/:wordId')
  .get(ctrlWords.wordById)

module.exports = router;