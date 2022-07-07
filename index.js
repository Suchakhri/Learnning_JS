const express = require("express");
const axios = require("axios");
const line = require("@line/bot-sdk");
var mysql = require("mysql");
const env = require("dotenv").config().parsed;
const app = express();
const port = process.env.PORT || 4000;

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
    "Database is running on HOST : Amazon Relational Database Service."
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
      "SELECT name, address FROM vercel_aws.customers;",
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
  console.log(results.data[0]);
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
  let results = await axios.get("https://learnning-js.vercel.app/select");
  let data = results.data;
  switch (event.message.text) {
    case "คิดถึง":
      return client.replyMessage(event.replyToken, {
        type: "text",
        text: `คิดถึงแฟนมากกกก`,
      });
      break;
    case "รักแฟน":
      return client.replyMessage(event.replyToken, {
        type: "text",
        text: `รักแฟนเหมือนกันนะคร้าบ`,
      });
      break;
    default:
      let msg = `name: ${data[0].name}, address: ${data[0].address}`;
      let massage = [
        {
          type: "text",
          text: "This data from database ===> ",
        },
        {
          type: "text",
          text: msg,
        },
      ];
      return client.replyMessage(event.replyToken, massage);
  }
};
app.listen(port);
