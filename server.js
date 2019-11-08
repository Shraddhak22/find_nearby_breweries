const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.post("/openbreweries", (req, res) => {
  // console.log(req.body);
  const baseurl = `https://api.openbrewerydb.org/breweries?by_state=${req.body.state}`;

  axios({
    url: baseurl,
    responseType: "json"
  }).then(data => {
    res.send(data.data);
  });
});

app.listen(3000, () => {
  console.log("server started");
});
