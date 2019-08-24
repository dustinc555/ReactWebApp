var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var songRouter = require("./routes/song");

var cors = require("cors");

const fileUpload = require("express-fileupload");

var app = express();

// cors middleware for devlopment server
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));

// this tells express to parse text/plain requests as JSON
app.use(
  express.json({
    type: ["application/json", "text/plain"]
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());

app.use(express.static(path.join(__dirname, "client/build")));
app.use("/images", express.static(path.join(__dirname, "static/images")));
app.use("/songs", express.static(path.join(__dirname, "static/songs")));

app.use("/api/song", songRouter);

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
