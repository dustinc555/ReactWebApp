var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var mysql_config = require("../services.json");
const fs = require("fs");
const util = require("util");

function getExtension(filename) {
  var parts = filename.split(".");
  return parts[parts.length - 1];
}

function isAcceptedImage(filename) {
  var ext = getExtension(filename);
  switch (ext.toLowerCase()) {
    case "jpg":
    case "png":
      // TODO: accept more image types
      return true;
  }
  return false;
}

router.get("/get/:songId", function(req, res, next) {
  var con = mysql.createConnection(mysql_config);

  var sql = "SELECT * FROM sys.song WHERE idsong = ?";

  // get item
  con.query(
    "SELECT * FROM sys.song WHERE idsong = ?",
    [req.body.idsong],
    (err, result) => {
      if (err) throw err;
      res.send(result[0]);
    }
  );
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

  var sql = "";

  if (req.body.text === "all") {
    sql = "SELECT * FROM sys.song";
  } else {
    var sql = `SELECT *, 
  match(title) AGAINST (?) as tr,
  match(artist) AGAINST (?) as ar from sys.song
  WHERE match(title) AGAINST (?)
  OR match(artist) AGAINST (?)
  ORDER BY ar DESC, tr DESC`;
  }

  // get item
  con.query(
    sql,
    [req.body.text, req.body.text, req.body.text, req.body.text],
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

    if (!isAcceptedImage(req.files.img.name)) {
      throw { name: "invalid data", message: "" };
    }

    //console.log(util.inspect(req.files.img, { showHidden: false, depth: 2 }));
    if (req.files.img.size > 50000 || req.files.img.type) {
      throw {
        name: "invalid image",
        message: "either too large or wrong extention"
      };
    }

    // store item and get id
    con.query(
      "INSERT INTO sys.song (title, artist) VALUES (?, ?)",
      [req.body.title, req.body.artist],
      (err, result) => {
        if (err) throw err;
        idsong = result.insertId;
        console.log("pushed to db");

        // save files
        req.files.img.mv(
          "./static/images/" + idsong + "." + getExtension(req.files.img.name)
        );
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
