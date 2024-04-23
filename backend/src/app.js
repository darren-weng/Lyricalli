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

let htmlDir = path.join(__dirname, "..", "..", "frontend", "src", "html");
app.get("/", (_, res) => {
  res.render(path.join(htmlDir, "index"));
});

app.post("/", urlencodedParser, (req, res) => {
  textyl.getLyrics(req.body.songName).then((result) => {
    res.render(path.join(htmlDir, "index"), { lyrics: result });
  });
});

app.get("/search", (_, res) => {
  res.render(path.join(htmlDir, "search-page"));
});

app.listen(port, () => {
  console.log("App listening on port " + port);
});
