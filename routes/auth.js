const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/", async function (req, res, next) {
  const { email, displayName } = req.body;

  try {
    const user = await User.findOne({ email }).lean().exec();

    if (user) {
      res.status(201).json({ result: "이미 등록된 사용자입니다." });
      return;
    }

    const newUser = await User.create({
      email,
      username: displayName,
    });

    const accessToken = await jwt.sign({ newUser }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    res.status(201).json({
      result: "success",
      data: {
        token: accessToken,
        userId: newUser._id,
      },
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
