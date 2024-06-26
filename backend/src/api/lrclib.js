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
  let songData = await response.json();

  songData.youtubeUrl =
    "https://www.youtube.com/embed/" + musicData[4] + "?enablejsapi=1";

  // pulls timestamps from synced lyrics string
  let syncedLyricsArr = songData.syncedLyrics.split("\n");
  let timestampArr = [];

  for (let i = 0; i < syncedLyricsArr.length; ++i) {
    // removes all timestamps with no lyrics
    const line = syncedLyricsArr[i].substring(10);
    if (line == " ") continue;

    // gets timestamp in seconds
    const min = parseFloat(syncedLyricsArr[i].substring(1, 3));
    const sec = parseFloat(syncedLyricsArr[i].substring(4, 9));
    const timestamp = min * 60 + sec;

    timestampArr.push(timestamp);
  }
  songData.timestamps = timestampArr;

  return songData;
}

module.exports = { getLyrics };
