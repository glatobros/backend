var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middleware/auth");

const Admin = require("../models/Admin");
const saltrounds = 10;

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/signup", async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.json({ message: "Please enter username and password" });
  }

  try {
    const salt = bcrypt.genSaltSync(saltrounds);
    const hashedPass = bcrypt.hashSync(req.body.password, salt);

    const newUser = await Admin.create({
      username: req.body.username,
      password: hashedPass,
    });

    const payload = {
      userame: newUser.username,
      id: newUser._id,
    };

    const token = jwt.sign(payload, process.env.SECRET, {
      algorithm: "HS256",
      expiresIn: "6h",
    });

    res.json({ token: token, id: newUser.id });
  } catch (err) {
    res.json(err.message);
  }
});

router.post("/login", async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.json({ message: "Please enter username and password" });
  }

  try {
    const foundUser = await Admin.findOne({ username: req.body.username });
    if (!foundUser) {
      return res
        .status(400)
        .json({ message: "Username or password is incorrect" });
    }

    const isMatch = bcrypt.compareSync(req.body.password, foundUser.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Username or password incorrect" });
    }

    const payload = {
      username: foundUser.username,
      id: foundUser._id,
    };

    const token = jwt.sign(payload, process.env.SECRET, {
      algorithm: "HS256",
      expiresIn: "6h",
    });

    res.json({ token: token, id: foundUser.id });
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.post("/update", isAuthenticated, async (req, res) => {
  try {
    const updateUser = await Admin.findByIdAndUpdate(
      req.user.id,
      { ...req.body },
      { new: true }
    );
    res.json(updateUser);
  } catch (err) {
    res.json(err.message);
  }
});

module.exports = router;
