const fetchOptions = {
  method: "GET",
  headers: {
    "User-Agent": "Lyrically 0.0.0 (https://github.com/darren-weng/Lyrically)",
  },
};

const rootUrl = "https://lrclib.net/api/";

// PARAMS: str, str, str, int
async function getLyrics(track, artist, album, duration) {
  const url =
    rootUrl +
    "get?track_name=" +
    encodeURIComponent(track) +
    "&artist_name=" +
    encodeURIComponent(artist) +
    "&album_name=" +
    encodeURIComponent(album) +
    "&duration=" +
    duration;

  const response = await fetch(url, fetchOptions);

  let lyrics = await response.json();
  console.log(lyrics.syncedLyrics);
}

getLyrics(
  "Never Gonna Give You Up",
  "Rick Astley",
  "Whenever You Need Somebody",
  214
);
