const fetchOptions = {
  method: "GET",
  headers: {
    "User-Agent": "Lyrically 0.0.0 (https://github.com/darren-weng/Lyrically)",
  },
};

const rootUrl = "https://lrclib.net/api/";

// returns synced and unsynced lyrics + youtube link
async function getLyrics(track) {
  const ytmusic = await import("./ytmusic.mjs");
  const musicData = await ytmusic.searchMusic(track);

  /** INDEXES OF MUSIC DATA
   * 0: title
   * 1: artist
   * 2: album
   * 3: duration (seconds)
   * 4: youtubeId
   */

  const url =
    rootUrl +
    "get?track_name=" +
    encodeURIComponent(musicData[0]) +
    "&artist_name=" +
    encodeURIComponent(musicData[1]) +
    "&album_name=" +
    encodeURIComponent(musicData[2]) +
    "&duration=" +
    musicData[3];

  const response = await fetch(url, fetchOptions);

  let lyrics = await response.json();
  lyrics.youtubeUrl = "https://www.youtube.com/embed/" + musicData[4]

  //* returns plain lyrics for testing purposes (will be changed in future)
  return lyrics;
}

module.exports = { getLyrics };
