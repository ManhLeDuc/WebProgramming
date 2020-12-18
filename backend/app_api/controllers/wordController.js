const mongoose = require("mongoose");
const regularUser = require("../models/regularUserModel");
const WordModel = require("./../models/wordModel");

exports.wordIdIfExist = (req, res, next) => {
  WordModel.findById(req.params.wordId).exec((err, wordRecord) => {
    if (err) {
      return res.status(404).json(err);
    } else if (!wordRecord) {
      return res.status(404).json({ message: "Invalid Word ID" });
    } else {
      next();
    }
  });
};

exports.getWordsByWordRegex = (req, res) => {
  WordModel.find({ word: new RegExp(`^${req.params.word}`, "i") }, "word")
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

exports.addWord = (req, res) => {
  WordModel.create(
    {
      word: req.body.word,
      pronunciation: req.body.pronunciation,
      datas: req.body.datas,
      collocations: req.body.collocations,
    },
    (err, wGroup) => {
      if (err) {
        console.log(err);
        res.status(400).json(err);
      } else {
        res.status(200).json(wGroup);
      }
    }
  );
};

exports.updateWord = (req, res) => {
  word.word = req.body.word;
  word.pronunciation = req.body.pronunciation;
  word.datas = req.body.datas;
  word.collocations = req.body.collocations;

  word.save((err, word) => {
    if (err) {
      res.status(404).json(err);
    } else {
      res.status(200).json(word);
    }
  });
};

exports.deleteWord = (req, res) => {
  WordModel.findByIdAndDelete(word._id).exec((err, word) => {
    if (err) {
      return res.status(404).json(err);
    } else {
      return res.status(204).json(null);
    }
  });
};
