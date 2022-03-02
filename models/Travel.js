const mongoose = require("mongoose");

const subTravelDiary = new mongoose.Schema({
  photoUrl: {
    type: String,
  },
  audioUrl: {
    type: String,
  },
  diary: {
    type: String,
  },
});

const subTravelLogs = new mongoose.Schema({
  travelPlace: {
    type: Array,
    required: true,
  },
  travelDetail: {
    type: Array,
    required: true,
  },
  coordinates: {
    type: Array,
    required: true,
  },
  travelDiary: subTravelDiary,
});

const TravelSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  travelLogs: [subTravelLogs],
});

const Travel = mongoose.model("Travel", TravelSchema);

module.exports = Travel;
