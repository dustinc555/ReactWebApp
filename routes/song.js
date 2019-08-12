var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/api/song/:songId", function(req, res, next) {
  console.log("get request " + req.params.songId);
});

router.delete("/api/song/:songId", function(req, res, next) {
  console.log("delete request " + req.params.songId);
});

router.post("/api/song", function(req, res, next) {
  console.log("post request" + req.params);
});

module.exports = router;
