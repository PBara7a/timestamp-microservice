const express = require("express");
const cors = require("cors");
const { isValidDate } = require("./utils.js");

const app = express();

app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:date?", (req, res) => {
  const dateStr = req.params.date;
  let dateObj;

  if (!dateStr) {
    dateObj = new Date();
  } else if (isNaN(dateStr)) {
    dateObj = new Date(dateStr);
  } else {
    dateObj = new Date(Number(dateStr));
  }

  if (!isValidDate(dateObj)) {
    res.json({ error: "Invalid Date" });
  }

  res.json({ unix: dateObj.getTime(), utc: dateObj.toUTCString() });
});

module.exports = app;
