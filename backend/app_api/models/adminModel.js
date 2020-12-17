const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    validator: [validator.isEmail, "Please provide a valid email"],
  },
  photo: {
    type: String,
    default: "default.jpg",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  hash: String,
  salt: String,
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // Use when work with CREATE and SAVE
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  passwordChangeAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

adminSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Encode the password before saving
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(this.password, this.salt, 1000, 64, "sha512")
    .toString("hex");

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

adminSchema.pre("save", function (next) {
  if (!this.isModified || this.isNew) return next();

  this.passwordChangeAt = Date.now() - 1000;
  next();
});

adminSchema.methods.validPassword = function (candidatePassword) {
  const candidateHash = crypto
    .pbkdf2Sync(cadidatePassword, this.salt, 1000, 64, "sha512")
    .toString("hex");
  return this.hash === candidateHash;
};

adminSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

adminSchema.methods.generateJwt = function () {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
      exp: parseInt(expiry.getTime() / 1000, 10),
    },
    process.env.JWT_SECRET
  );
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
