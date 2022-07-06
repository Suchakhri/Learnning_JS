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
  try {
    const events = req.body.events;
    console.log("events ====>", events);
    return events.length > 0
      ? events.map((item) => handleEvent(item))
      : res.status(200).send("OK");
  } catch (err) {
    res.status(500).end();
  }
});

// event handler
const handleEvent = async (event) => {
  console.log(event);
  return client.replyMessage(event.replyToken, { type: "text", text: "Test" });
};
app.listen(port);
