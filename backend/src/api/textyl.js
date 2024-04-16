const badWords = {
  "s**t": "shit",
  "f**k": "fuck",
  "b***h": "bitch",
  "a*s": "ass",
  "d**k": "dick",
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
  for (const key in badWords) {
    text = text.replaceAll(key, badWords[key]);
  }
  text = text.replace(/\\r/g, "");
  return JSON.parse(text);
}

module.exports = { getLyrics }


