const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (user)
      return res.status(400).json({
        message: "User already registered",
      });
    const { firstName, lastName, email, password } = req.body;

    const hash_password = await bcrypt.hash(password, 10);

    const _user = new User({
      firstName,
      lastName,
      email,
      hash_password,
      userName: shortid.generate(),
    });
    _user.save((error, data) => {
      if (error) {
        return res.status(500).json({
          message: "something went wrong",
        });
      }
      if (data) {
        return res.status(201).json({
          message: "user created successfully",
        });
      }
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      if (user.authenticate(req.body.password) && user.role === "user") {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          {
            expiresIn: "3d",
          }
        );
        const { _id, firstName, email, lastName, role, fullName } = user;
        res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            email,
            role,
            fullName,
          },
        });
      } else {
        return res.status(400).json({
          message: "user is not valid or password is wrong",
        });
      }
    } else {
      return res.status(500).json({ message: "something went wrong" });
    }
  });
};
