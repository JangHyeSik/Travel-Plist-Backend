const express = require("express");
const router = express.Router();

router.post("/", function (req, res, next) {
  res.json({ result: "success" });
});

module.exports = router;
