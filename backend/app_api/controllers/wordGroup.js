const mongoose = require('mongoose');
const WordGroupModel = mongoose.model('WordGroup');

const authenOwnerWordGroup = (req, res, callback) => {
  if (req.params.locationid && req.payload && req.payload._id) {
    WordGroupModel
      .findById(req.params.wordGroupId)
      .exec((err, wordGroup) => {
        if (!wordGroup) {
          return res
            .status(404)
            .json({ "message": "Word Group not found" });
        } else if (err) {
          console.log(err);
          return res
            .status(404)
            .json(err);
        } else if (wordGroup.owner !== req.payload._id) {
          return res
            .status(404)
            .json({ "message": "Bad Request" });
        }
        callback(req, res, wordGroup);
      });
  } else {
    return res
      .status(404)
      .json({ "message": "Bad Request" });
  }
}

const createWordGroup = (req, res) => {
  WordGroupModel.create({
    name: req.body.name,
    owner: req.payload._id,
    wordIds: [],
  },
    (err, wGroup) => {
      if (err) {
        res
          .status(400)
          .json(err);
      }
      else {
        res
          .status(200)
          .json(wGroup);
      }
    });
}

const updateWordGroup = (req, res) => {
  authenOwnerWordGroup(req, res,
    (req, res, wordGroup) => {
      wordGroup.name = req.body.name;
      wordGroup.save((err, wGroup) => {
        if (err) {
          res
            .status(404)
            .json(err);
        } else {
          res
            .status(200)
            .json(wGroup);
        }
      })
    });
}

const deleteWordGroup = (req, res) => {
  authenOwnerWordGroup(req, res,
    (req, res, wordGroup) => {
      WordGroupModel
        .findByIdAndDelete(wordGroup._id)
        .exec((err, wGroup) => {
          if (err) {
            return res
              .status(404)
              .json(err);
          }
          else {
            return res
              .status(204)
              .json(null);
          }
        });
    });
}

const getWordGroup = (req, res) => {
  authenOwnerWordGroup(req, res,
    (req, res, wordGroup) => {
      return res
        .status(200)
        .json(wordGroup);
    });
};

const getWordFromGroup = (req, res) => {
  authenOwnerWordGroup(req, res,
    (req, res, wordGroup) => {
      return res
        .status(200)
        .json(wordGroup);
    });
}

const addWordToGroup = (req, res) => {
  authenOwnerWordGroup(req, res,
    (req, res, wordGroup) => {
      return res
        .status(200)
        .json(wordGroup);
    });
}

const deleteWordFromGroup = (req, res) => {
  authenOwnerWordGroup(req, res,
    (req, res, wordGroup) => {
      return res
        .status(200)
        .json(wordGroup);
    });
}

module.exports = {
  createWordGroup,
  updateWordGroup,
  deleteWordGroup,
  getWordGroup,
  getWordFromGroup,
  addWordToGroup,
  deleteWordFromGroup
}