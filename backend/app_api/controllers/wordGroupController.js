const mongoose = require("mongoose");
const WordGroupModel = mongoose.model("WordGroup");
const WordModel = mongoose.model("Word");

exports.authOwnerWordGroup = (req, res, next) => {
  if (req.params.wordGroupId && req.payload && req.payload._id) {
    WordGroupModel.findById(req.params.wordGroupId).exec((err, wordGroup) => {
      if (!wordGroup) {
        return res.status(404).json({ message: "Word Group not found" });
      } else if (err) {
        console.log(err);
        return res.status(404).json(err);
      } else if (wordGroup.owner.toString() !== req.payload._id) {
        return res.status(404).json({ message: "Bad Request" });
      } else {
        next();
      }
    });
  } else {
    return res.status(404).json({ message: "Bad Request" });
  }
};

exports.validateWordId = (req, res, next) => {
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

exports.createWordGroup = (req, res) => {
  WordGroupModel.create(
    {
      name: req.body.name,
      owner: req.payload._id,
      wordIds: [],
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

exports.updateWordGroup = (req, res) => {
  wordGroup.name = req.body.name;
  wordGroup.save((err, wGroup) => {
    if (err) {
      res.status(404).json(err);
    } else {
      res.status(200).json(wGroup);
    }
  });
};

exports.deleteWordGroup = (req, res) => {
  WordGroupModel.findByIdAndDelete(wordGroup._id).exec((err, wGroup) => {
    if (err) {
      return res.status(404).json(err);
    } else {
      return res.status(204).json(null);
    }
  });
};

exports.getAllWordGroups = (req, res) => {
  if (req.payload && req.payload._id) {
    WordGroupModel.find({ owner: req.payload._id })
      .select("name")
      .exec((err, records) => {
        if (err) {
          return res.status(404).json(err);
        } else {
          return res.status(200).json(records);
        }
      });
  } else {
    return res.status(404).json({ message: "Bad Request" });
  }
};

exports.getWordGroup = (req, res) => {
  WordModel.find()
    .where("_id")
    .in(wordGroup.wordIds)
    .select({ word: 1, _id: 0 })
    .exec((err, wordRecords) => {
      if (err) {
        return res.status(404).json(err);
      } else {
        return res.status(200).json({
          wGroup: wordGroup,
          words: wordRecords,
        });
      }
    });
};

exports.getWordFromGroup = (req, res) => {
  return res.status(200).json(wordRecord);
};

exports.addWordToGroup = (req, res) => {
  wordGroup.wordIds.addToSet(req.params.wordId);
  wordGroup.save((err, wGroup) => {
    if (err) {
      return res.status(404).json(err);
    } else {
      return res.status(200).json(wGroup);
    }
  });
};

exports.deleteWordFromGroup = (req, res) => {
  if (wordGroup.wordIds.length > 0) {
    if (!wordGroup.wordIds.includes(req.params.wordId)) {
      return res.status(404).json({ message: "Word not found in Group" });
    } else {
      wordGroup.wordIds.remove(req.params.wordId);
      wordGroup.save((err, wGroup) => {
        if (err) {
          return res.status(404).json(err);
        } else {
          return res.status(200).json(wGroup);
        }
      });
    }
  }
};
