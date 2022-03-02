const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const User = require("../models/User");
const Travel = require("../models/Travel");

router.post("/", verifyToken, async (req, res, next) => {
  const { title, startDate, endDate, userId } = req.body;

  try {
    const differenceDay =
      (new Date(endDate) - new Date(startDate)) / (1000 * 3600 * 24) + 1;

    let travelLogs = [];
    for (let i = 0; i < differenceDay; i++) {
      travelLogs.push({
        travelPlace: [],
        travelDetail: [],
        coordinates: [],
        travelDiary: {},
      });
    }

    const newTravel = await Travel.create({
      title,
      startDate,
      endDate,
      author: userId,
      travelLogs,
    });

    await User.findByIdAndUpdate(userId, {
      $push: { travels: newTravel._id },
    });

    res.status(201).json({ result: "success", newTravel });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
