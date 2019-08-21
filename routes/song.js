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

  // get item
  con.query(
    "DELETE FROM sys.song WHERE idsong = ?;",
    [req.body.idsong],
    (err, result) => {
      if (err) throw err;
      res.send("success");
    }
  );
});

router.post("/query", function(req, res, next) {
  var con = mysql.createConnection(mysql_config);

  // get item
  con.query(
    "SELECT * FROM sys.song WHERE title LIKE %?% AND artist LIKE %?%",
    [req.body.title, req.body.artist],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

router.post("/insert", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT, POST,DELETE");

  var con = mysql.createConnection(mysql_config);

  var idsong = -1;

  try {
    // validate data
    if (
      req.files.img == null ||
      req.files.song == null ||
      req.body.title == null ||
      req.body.artist == null
    )
      throw { name: "invalid data", message: "one or more null fields" };

    // store item and get id
    con.query(
      "INSERT INTO * sys.song (title, artist) VALUES ('?', '?')",
      [req.body.title, req.body.artist],
      (err, result) => {
        if (err) throw err;
        idsong = result.insertId;
        console.log("pushed to db");
        // save files
        req.files.img.mv("./static/images/" + idsong + ".jpg");
        console.log("image saved!");

        req.files.song.mv("./static/songs/" + idsong + ".wav");
        console.log("song saved!");
      }
    );
  } catch (err) {
    res.send({ result: "error", idsong: idsong });
  }

  res.send({ result: "success", idsong: idsong });
});

module.exports = router;
