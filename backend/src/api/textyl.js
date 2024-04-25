const undici = require('undici');
const unidecode = require("unidecode");
const Kuroshiro = require("kuroshiro");
const KuromojiAnalyzer = require("kuroshiro-analyzer-kuromoji");
const kuroshiro = new Kuroshiro();

const badWords = {
  fxxk: "fuck",
  "b(xxth|xxxh)|xxxxx": "bitch",
  "s(hxt|xxt)|xxxx": "shit",
  "a(xs|xx)": "ass",
  dxxk: "dick",
  "n(ixxa|xxxa)": "nigga",
  dxxe: "dope",
  pxxsy: "pussy",
};

// * fetches the lyrics from the API
async function getLyrics(song) {
  const url = "https://api.textyl.co/api/lyrics?q=" + encodeURIComponent(song);

  const response = await undici.fetch(url, {
    method: "GET",
    mode: "cors",
    credentials: "same-origin",
    dispatcher: new undici.Agent({
      connect: {
        rejectUnauthorized: false
      }
    })
  });

  let lyrics = await response.text();

  return removeFilter(lyrics);
}

// * uncensors bad words and romanizes
function removeFilter(text) {
  text = text.replaceAll("*", "x");

  // * uncensor words
  for (const key in badWords) {
    const regex = new RegExp(key, "gi");
    text = text.replaceAll(regex, (match) => {
      if (match[0] == match[0].toUpperCase()) {
        return badWords[key][0].toUpperCase() + badWords[key].slice(1);
      }
      return badWords[key];
    });
  }
  text = text.replace(/\\r/g, "");
  let parsedJson = JSON.parse(text);

  // * romanization starts here
  if (Kuroshiro.Util.hasJapanese(text)) {
    return kuroshiro.init(new KuromojiAnalyzer()).then(() => {
      return romanizeJapanese(parsedJson).then((res) => {
        return res;
      });
    });
  } else {
    for (let i = 0; i < parsedJson.length; ++i) {
      parsedJson[i].lyrics = unidecode(parsedJson[i].lyrics).replaceAll(
        '"',
        ""
      );
    }
    return parsedJson;
  }
}

// * transliterates japanese
async function romanizeJapanese(parsedJson) {
  const promises = parsedJson.map((item) =>
    kuroshiro.convert(item.lyrics, { mode: "spaced", to: "romaji" })
  );

  const results = await Promise.all(promises);

  results.forEach((res, index) => {
    parsedJson[index].lyrics = unidecode(res);
  });

  return parsedJson;
}

// getLyrics("idol").then((res) => console.log(res));

module.exports = { getLyrics };
