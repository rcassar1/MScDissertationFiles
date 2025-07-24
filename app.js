var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const cors = require("cors");

const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

var indexRouter = require("./routes/index");
var studentsRouter = require("./routes/students");
var attendanceStatusRouter = require("./routes/attendanceStatus");
var attendanceRouter = require("./routes/attendance");
var classRouter = require("./routes/class");
var educatorRoleRouter = require("./routes/educatorRole");
var educatorRouter = require("./routes/educator");
var diaryRouter = require("./routes/diary");
var calendarSRouter = require("./routes/calendar-s");
var announcementsRouter = require("./routes/announcements");
var studentEventApprovalsRouter = require("./routes/studentEventApprovals");

mongoose.connect(process.env.MONGODB).then(() => console.log("DB Connected"));

require("./models/attendance");
require("./models/attendanceStatus");
require("./models/announcements");
require("./models/calendar-s");
require("./models/class");
require("./models/diary");
require("./models/educatorRole");
require("./models/educators");
require("./models/eventsApproval");
require("./models/notesCertificates");
require("./models/student");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/students", studentsRouter);
app.use("/attendancestatus", attendanceStatusRouter);
app.use("/attendance", attendanceRouter);
app.use("/class", classRouter);
app.use("/educatorrole", educatorRoleRouter);
app.use("/educator", educatorRouter);
app.use("/diary", diaryRouter);
app.use("/studentcalendar", calendarSRouter);
app.use("/announcements", announcementsRouter);
app.use("/approve", studentEventApprovalsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
