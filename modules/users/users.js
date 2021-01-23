const bcrypt = require("bcrypt");
const { model, Schema } = require("mongoose");
const audit = require("../model/audit");

const { SALT } = process.env;

const UsersSchema = Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minlength: 8,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    maxlength: 120,
  },
  role: { type: String, enum: ["ADMIN", "USERS"] },
  firstName: { type: String, maxlength: 100 },
  lastName: { type: String, maxlength: 100 },
  address: { type: String, required: true },
  city: { type: String, required: true, maxlength: 100 },
  district: { type: String, maxlength: 100 },
  phone: { type: String, required: true, maxlength: 10 },
  isActive: { type: Boolean, default: false },
  lastLogin: { type: Date },
  ...audit,
});

UsersSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

UsersSchema.pre(["updateOne", "findOneAndUpdate"], function (next) {
  this.role = "USERS";
  this.updatedTs = Date.now();
  next();
});

// Hash password
UsersSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const hash = await bcrypt.hashSync(String(this.password), +SALT);
    this.password = hash;
  }
});

// Check is password matches the hash password
UsersSchema.methods.matchesPassword = function (password) {
  if (!this.password) {
    return false;
  }
  return bcrypt.compareSync(password, this.password);
};

module.exports = model("Users", UsersSchema);
