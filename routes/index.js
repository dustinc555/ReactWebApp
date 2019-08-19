var express = require("express");
var path = require("path");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  const index = path.join(__dirname, "build", "index.html");
  res.sendFile(index);
});

module.exports = router;
