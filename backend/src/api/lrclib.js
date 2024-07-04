// japanese transliterator
const Kuroshiro = require("kuroshiro");
const KuromojiAnalyzer = require("kuroshiro-analyzer-kuromoji");
const kuroshiro = new Kuroshiro();

const unidecode = require("unidecode");

const fetchOptions = {
  method: "GET",
  headers: {
    "User-Agent": "Lyrically 0.0.0 (https://github.com/darren-weng/Lyrically)",
  },
};

const rootUrl = "https://lrclib.net/api/";
let kuroshiroInit = false;

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

  // * ------------------- romanization starts here ---------------------- * //
  // gets rid of empty lines and creates an array
  let lyricsArr = songData.plainLyrics.split("\n").filter((item) => item != "");

  if (Kuroshiro.Util.hasHiragana(songData.plainLyrics)) {
    if (kuroshiroInit == false) {
      await kuroshiro.init(new KuromojiAnalyzer());
      kuroshiroInit = true;
    }
    const decodedArr = await transliterateJapanese(lyricsArr).then((res) => {
      return res;
    });
    songData.plainLyrics = decodedArr;
  } else {
    let decodedArr = [];
    for (let i = 0; i < lyricsArr.length; i++) {
      decodedArr.push(unidecode(lyricsArr[i].replace(/\s+/g, " ")));
    }
    songData.plainLyrics = decodedArr;
  }

  songData.timestamps = timestampArr;

  console.log(songData.plainLyrics);
  return songData;
}

async function transliterateJapanese(array) {
  let transliteratedArr = [];

  for (let i = 0; i < array.length; i++) {
    let converted = await kuroshiro.convert(array[i], {
      mode: "spaced",
      to: "romaji",
    });
    // removes spaces before and after an apostrophe, removes quotes, removes extra spaces
    converted = unidecode(
      converted
        .replace(/\s*'\s*/g, "'") // Remove spaces before and after an apostrophe
        .replace(/[\"()]/g, "") // Remove all instances of quotes
        .replace(/\s+/g, " ") // Replace multiple spaces with a single space
        .trim()
    );

    transliteratedArr.push(converted);
  }

  return transliteratedArr;
}

getLyrics("supernova new jeans");

module.exports = { getLyrics };
