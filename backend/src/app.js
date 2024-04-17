const textyl = require("./api/textyl");

const express = require("express");
const get = require("http");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.static("./frontend/src"));

app.get("/", (req, res) => {
  res.render(
    path.join(__dirname, "..", "..", "frontend", "src", "index.html"),
  );
});

app.listen(port, () => {
  console.log("App listening on port " + port);
});

// was just testing the get lyrics here
textyl.getLyrics("sheck wes").then((result) => {
  console.log(result);
});

