const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/", async function (req, res, next) {
  const { email, displayName } = req.body;

  try {
    const user = await User.findOne({ email }).lean().exec();

    const accessToken = await jwt.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    if (user) {
      res.status(201).json({
        result: "이미 등록된 사용자입니다.",
        data: {
          user,
          token: accessToken,
        },
      });

      return;
    }

    const newUser = await User.create({
      email,
      username: displayName,
    });

    res.status(201).json({
      result: "success",
      data: {
        user: newUser,
        token: accessToken,
      },
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
