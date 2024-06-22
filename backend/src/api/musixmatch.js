require("dotenv").config();
const apiKey = process.env.MUSIXMATCH_API_KEY;
const rootUrl = "http://api.musixmatch.com/ws/1.1/";

// http://api.musixmatch.com/ws/1.1/track.search?apikey=***&q_track=Dire%20straits%20Sultans%20of%20Swing&page_size=10
// https://api.musixmatch.com/ws/1.1/matcher.track.get?apikey=75ca57a4b52a9fe192b5374ab0a65a21&q_track=a%20te&q_artist=Jovanotti&f_has_lyrics=1

// just take the track and find the artist using ytmusic so you can match a song and get the ID
// album is likely not needed
async function matchSong(track, artist) {
  let url = rootUrl + "matcher.track.get?apikey=" + apiKey;

  if (track) url += "&q_track=" + encodeURIComponent(track);
  if (artist) url += "&q_artist=" + encodeURIComponent(artist);

  // just giving the url for now
  console.log(url);
}

matchSong("never gonna give you up", "rick astley");
