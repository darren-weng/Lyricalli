const badWords = {
  "s(hxt|xxt)": "shit",
  "fxxk": "fuck",
  "b(itch|xxth|xxxh|xxxxx)": "bitch",
  "a(xs|xx)": "ass",
  "dxxk": "dick",
  "n(ixxa|xxxa)": "nigga",
  "dxxe": "dope",
  "pxxsy": "pussy",
};

// fetches the lyrics from the API
async function getLyrics(song) {
  const url = "https://api.textyl.co/api/lyrics?q=" + encodeURIComponent(song);

  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    credentials: "same-origin",
  });

  let lyrics = await response.text();

  return removeFilter(lyrics);
}

function removeFilter(text) {
  text = text.replaceAll("*", "x");

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
  return JSON.parse(text);
}

module.exports = { getLyrics };
