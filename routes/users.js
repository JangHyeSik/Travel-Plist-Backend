const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

router.get("/", verifyToken, function (req, res, next) {
  res.json({ result: "success" });
});

module.exports = router;
