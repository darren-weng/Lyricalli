require("dotenv").config();
const apiKey = process.env.MUSIXMATCH_API_KEY;
const rootUrl = "http://api.musixmatch.com/ws/1.1/";

// http://api.musixmatch.com/ws/1.1/track.search?apikey=***&q_track=Dire%20straits%20Sultans%20of%20Swing&page_size=10
// https://api.musixmatch.com/ws/1.1/matcher.track.get?apikey=75ca57a4b52a9fe192b5374ab0a65a21&q_track=a%20te&q_artist=Jovanotti&f_has_lyrics=1

// just take the track and find the artist using ytmusic so you can match a song and get the ID
// album is likely not needed
async function matchSong(track) {
  const ytmusic = await import("./ytmusic.mjs");
  const artist = await ytmusic.searchMusic(track);

  let url =
    rootUrl +
    "matcher.track.get?apikey=" +
    apiKey +
    "&q_track=" +
    encodeURIComponent(track) +
    "&q_artist=" +
    encodeURIComponent(artist.artists[0].name);

  // just giving the url for now
  console.log(url);
}

async function getLyrics(trackId) {
  let url = rootUrl + "track.lyrics.get?apikey=" + apiKey + "&track_id=" + trackId
  console.log(url);
}

//track id - 31409936
matchSong("never gonna give you up");
getLyrics("31409936")