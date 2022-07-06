const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
app.get("/", (req, res) => {
  res.json(`Serer is running on PORT : ${PORT}.`);
});
app.post("/webhook", (req, res) => res.sendStatus(200));
app.listen(PORT);
