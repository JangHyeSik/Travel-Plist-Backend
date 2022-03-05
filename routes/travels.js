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
        travelPlaces: [],
        travelDetails: [],
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

router.put("/:travelid/:travellogid", verifyToken, async (req, res, next) => {
  const { travelid, travellogid } = req.params;
  const { travelPlaces, travelDetails, coordinates } = req.body;

  try {
    const travel = await Travel.findById(travelid).lean();
    const { travelLogs } = travel;

    let travelLog = {};
    for (let i = 0; i < travelLogs.length; i++) {
      if (travelLogs[i]._id.toString() === travellogid) {
        travelLog = {
          ...travelLogs[i],
          travelPlaces,
          travelDetails,
          coordinates,
        };
      }
    }

    const updatedTravel = await Travel.findByIdAndUpdate(
      travelid,
      { $set: { "travelLogs.$[travelLog]": travelLog } },
      { arrayFilters: [{ "travelLog._id": travellogid }], new: true }
    ).exec();

    res.status(200).json({ result: "success", updatedTravel });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
