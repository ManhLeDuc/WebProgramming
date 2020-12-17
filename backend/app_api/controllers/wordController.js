const mongoose = require("mongoose");
const WordModel = require("./../models/wordModel");

exports.getWordsByWordRegex = (req, res) => {
  WordModel.find({ word: new RegExp("^" + req.params.word, "i") }, "word")
    .lean()
    .limit(10)
    .sort({ word: 1 })
    .exec((err, words) => {
      if (!words) {
        return res.status(404).json({
          success: false,
          message: "words not found",
        });
      } else if (err) {
        return res.status(404).json({
          success: false,
          message: err,
        });
      } else {
        return res.status(200).json({
          success: true,
          data: words,
        });
      }
    });
};

exports.getWordByWordName = (req, res) => {
  WordModel.findOne({
    word: new RegExp(`^${req.params.word}$`, "i"),
  }).exec((err, words) => {
    if (!words) {
      return res.status(404).json({
        success: false,
        message: "words not found",
      });
    } else if (err) {
      return res.status(404).json({
        success: false,
        message: err,
      });
    } else {
      return res.status(200).json({
        success: true,
        data: words,
      });
    }
  });
};

exports.getWordById = (req, res) => {
  WordModel.findById(req.params.id).exec((err, words) => {
    if (!words) {
      return res.status(404).json({
        success: false,
        message: "words not found",
      });
    } else if (err) {
      return res.status(404).json({
        success: false,
        message: err,
      });
    } else {
      return res.status(200).json({
        success: true,
        data: words,
      });
    }
  });
};
