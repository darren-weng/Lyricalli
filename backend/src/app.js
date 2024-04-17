const textyl = require("./api/textyl");

const express = require("express");
const bodyParser = require("body-parser");
const get = require("http");
const path = require("path");
const app = express();
const port = 3000;

// necessary to pull data from POST
let urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static("./frontend/src"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render(path.join(__dirname, "..", "..", "frontend", "src", "index"));
});

app.post("/", urlencodedParser, (req, res) => {
  textyl.getLyrics(req.body.songName).then((result) => {
    res.render(path.join(__dirname, "..", "..", "frontend", "src", "index"), {
      lyrics: result,
    });
  });
});

app.listen(port, () => {
  console.log("App listening on port " + port);
});

// was just testing the get lyrics here
