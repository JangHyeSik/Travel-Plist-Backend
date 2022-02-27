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

const TravelLogSchema = new mongoose.Schema({
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

const TravelLog = mongoose.model("TravelLog", TravelLogSchema);

module.exports = TravelLog;
