const express = require("express");
const axios = require("axios");
const line = require("@line/bot-sdk");
var mysql = require("mysql");
const env = require("dotenv").config().parsed;
const app = express();
const port = process.env.PORT || 8443;

// MySQL Connection
var db_conn = mysql.createConnection({
  host: env.db_host,
  user: env.db_user,
  password: env.db_password,
  port: env.db_port,
  database: env.db_database,
});
db_conn.connect((err) => {
  if (err) throw err;
  console.log(
    "Database is running on HOST : https://sgsv13.hostatom.com:8443/"
  );
});

const lineConfig = {
  channelAccessToken: env.CHANNEL_ACCESS_TOKEN,
  channelSecret: env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.Client(lineConfig);
app.get("/", (req, res) => {
  res.json(`Serer is running on PORT : ${port}.`);
});

// SELECT
app.get("/select", async (req, res) => {
  try {
    db_conn.query(
      "SELECT name, address FROM customers;",
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        return res.status(200).json(results);
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

app.get("/axios", async (req, res) => {
  let results = await axios.get("https://learnning-js.vercel.app/select");
  console.log(results.data);
  return res.status(200).json("See log");
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
  switch (event.message.text) {
    case "0":
      var msg = `Sever is running on PORT : https://learnning-js.vercel.app/${port}.`;
      return client.replyMessage(event.replyToken, {
        type: "text",
        text: msg,
      });
      break;
    case "1":
      var massage = [
        {
          type: "text",
          text: "Database is running on HOST : https://sgsv13.hostatom.com:8443/",
        },
        {
          type: "text",
          text: "Success...",
        },
      ];
      return client.replyMessage(event.replyToken, massage);
      break;
    default:
      var msg = `${event.message.text}`;
      var massage = [
        {
          type: "text",
          text: msg,
        },
        {
          type: "text",
          text: "reply your text",
        },
      ];
      return client.replyMessage(event.replyToken, massage);
  }
};
app.listen(port);
