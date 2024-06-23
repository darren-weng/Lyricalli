const lrclib = require("./api/lrclib");

const express = require("express");
const bodyParser = require("body-parser");
const get = require("http");
const path = require("path");
const { lstat } = require("fs");
const app = express();
const port = 3000;

const htmlDir = path.join(__dirname, "..", "..", "frontend", "src", "html");

// necessary to pull data from POST
let urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static("./frontend/src"));
app.set("view engine", "ejs");

app.get("/", (_, res) => {
  res.render(path.join(htmlDir, "index"));
});

app.post("/", urlencodedParser, (req, res) => {
  lrclib.getLyrics(req.body.songName).then((result) => {
    res.render(path.join(htmlDir, "index"), { lyrics: result });
  });
});

app.get("/search", (_, res) => {
  res.render(path.join(htmlDir, "search-page"));
});

app.get("/artist", (_, res) => {
  lastfm.searchArtist("taylorswift").then((result) => {
    console.log(result);
    res.render(path.join(htmlDir, "artist"), { songs: result });
  });
});

app.listen(port, () => {
  console.log("App listening on port " + port);
});
