const axios = require("axios");
const line = require("@line/bot-sdk");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const env = require("dotenv").config().parsed;
app.use(express.json());

const lineConfig = {
  channelAccessToken: env.CHANNEL_ACCESS_TOKEN,
  channelSecret: env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.Client(lineConfig);

app.get("/", (req, res) => {
  res.json(`Serer is running on PORT : ${PORT}.`);
});

app.post("/webhook", line.middleware(lineConfig), (req, res) => {
  res.sendStatus(200);
});
// event handler
const handleEvent = async (event) => {
  console.log(event);
  return client.replyMessage(event.replyToken, { type: "text", text: "Test" });
};

app.listen(PORT, () => {
  console.log(`Serer is running on PORT : ${PORT}.`);
  console.log(`http://localhost:${PORT}`);
});

module.exports = app;
