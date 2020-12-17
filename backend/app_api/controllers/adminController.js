const passport = require("passport");

const Admin = require("../models/adminModel");

exports.getAdminInfo = (req, res) => {
  if (req.payload && req.payload._id) {
    Admin.findById(req.payload._id, { hash: 0, salt: 0 }).exec((err, user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      } else if (err) {
        return res.status(404).json(err);
      }
      res.json(user);
    });
  } else {
    return res.status(404).json({ message: "User not found" });
  }
};
