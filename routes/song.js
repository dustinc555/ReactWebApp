var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var mysql_config = require("../services.json");

router.get("/get/:songId", function(req, res, next) {
  var con = mysql.createConnection(mysql_config);

  var sql = "SELECT * FROM sys.song WHERE idsong = " + req.params.songId + ";";

  // get item
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result[0]);
  });
});

router.get("/all", function(req, res, next) {
  var con = mysql.createConnection(mysql_config);

  var sql = "SELECT * FROM sys.song";

  // get items
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.delete("/delete/:songId", function(req, res, next) {
  var con = mysql.createConnection(mysql_config);

  var sql = "DELETE FROM sys.song WHERE idsong = " + req.params.songId + ";";

  // get item
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send("success");
  });
});

router.post("/insert", function(req, res, next) {
  var con = mysql.createConnection(mysql_config);

  var sql =
    "INSERT INTO song (title, artist) VALUES (" +
    req.body.title +
    "," +
    req.body.author +
    ")";

  // get item
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send("success");
  });
});

module.exports = router;
