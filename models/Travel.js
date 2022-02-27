const mongoose = require("mongoose");

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
  travelLogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TravelLog",
    },
  ],
});

const Travel = mongoose.model("Travel", TravelSchema);

module.exports = Travel;
