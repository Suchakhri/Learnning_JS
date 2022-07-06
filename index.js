const axios = require("axios");
const line = require("@line/bot-sdk");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.get("/", (req, res) => {
  res.json(`Serer is running on PORT : ${PORT}.`);
});

app.listen(PORT, () => {
  console.log(`Serer is running on PORT : ${PORT}.`);
  console.log(`http://localhost:${PORT}`);
});

module.exports = app;
