const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const port = process.env.PORT || 4000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post("/webhook", (req, res) => {
  let reply_token = req.body.events[0].replyToken;
  reply(reply_token);
  res.sendStatus(200);
});
app.listen(port);
function reply(reply_token) {
  let headers = {
    "Content-Type": "application/json",
    Authorization:
      "Bearer {6Tv1Y8Mm6Mc0M/MXxkWsPkD2IVpj+6IrRJwx4EpOKkaeSKC+ylEg2STHEOUW/TqqNOZSYLax7oxn77uQG4XunvS/ZR9BdbWc7FXQWpsZqUD87DF3A5KHs0aPUqmDfu+LvSgZi7Wk5KA18SaORxhhMQdB04t89/1O/w1cDnyilFU=}",
  };
  let body = JSON.stringify({
    replyToken: reply_token,
    messages: [
      {
        type: "text",
        text: "Hello",
      },
      {
        type: "text",
        text: "How are you?",
      },
    ],
  });
  request.post(
    {
      url: "https://api.line.me/v2/bot/message/reply",
      headers: headers,
      body: body,
    },
    (err, res, body) => {
      console.log("status = " + res.statusCode);
    }
  );
}
