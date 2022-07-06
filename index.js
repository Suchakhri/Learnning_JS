const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
app.get("/", (req, res) => {
  res.json(`Serer is running on PORT : ${port}.`);
});
app.post("/webhook", (req, res) => res.sendStatus(200));
app.listen(port);
