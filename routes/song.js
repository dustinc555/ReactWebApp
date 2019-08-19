var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var mysql_config = require("../services.json");
const fs = require("fs");
const util = require("util");

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
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT, POST,DELETE");

  var con = mysql.createConnection(mysql_config);

  var sql =
    'INSERT INTO sys.song (title, artist) VALUES ("' +
    req.body.title +
    '","' +
    req.body.artist +
    '")';

  console.log("sql: " + sql);

  var idsong = -1;

  try {
    // store item and get id
    con.query(sql, (err, result) => {
      if (err) throw err;
      idsong = result.insertId;
      console.log("pushed to db");
      // save files
      req.files.img.mv("./static/images/" + idsong + ".jpg");
      console.log("image saved!");

      req.files.song.mv("./static/songs/" + idsong + ".wav");
      console.log("song saved!");
    });
  } catch {
    res.send({ result: "error", idsong: idsong });
  }

  res.send({ result: "success", idsong: idsong });
});

module.exports = router;
