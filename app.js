const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:date?", (req, res) => {
  const date = isNaN(req.params.date)
    ? new Date(req.params.date)
    : new Date(Number(req.params.date));

  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

module.exports = app;
