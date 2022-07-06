const express = require("express");
const axios = require("axios");
const line = require("@line/bot-sdk");
const env = require("dotenv").config().parsed;
const app = express();
const port = process.env.PORT || 4000;

const lineConfig = {
  channelAccessToken: env.CHANNEL_ACCESS_TOKEN,
  channelSecret: env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.Client(lineConfig);
app.get("/", (req, res) => {
  res.json(`Serer is running on PORT : ${port}.`);
});
// verify
app.post("/webhook", line.middleware(lineConfig), (req, res) => {
  res.sendStatus(200);
});
app.listen(port);
