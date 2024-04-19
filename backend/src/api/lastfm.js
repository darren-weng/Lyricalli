require("dotenv").config();
const apiKey = process.env.LASTFM_API_KEY;

//! maybe find a way to merge getTopArtists and getTopSongs to prevent repetition
// fetches the top 100 artists/songs
async function getTopArtists(country) {
  let url = "";

  if (country) {
    url =
      "https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=" +
      country +
      "&limit=100" +
      "&api_key=" +
      apiKey +
      "&format=json";
  } else {
    url =
      "https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=" +
      apiKey +
      "&format=json";
  }

  const response = await fetch(url, {
    method: "GET",
  });

  const topArtists = await response.text();
  return filterTopArtists(topArtists);
}

async function getTopSongs(country) {
  let url = "";

  if (country) {
    url =
      "https://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=" +
      country +
      "&limit=100" +
      "&api_key=" +
      apiKey +
      "&format=json";
  } else {
    url =
      "https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=" +
      apiKey +
      "&format=json";
  }

  const response = await fetch(url, {
    method: "GET",
  });

  const topSongs = await response.text();
  return filterTopSongs(topSongs);
}

// converts JSON information of artists to array
function filterTopArtists(text) {
  let artists = [];
  text = JSON.parse(text);

  if (text.artists != undefined) {
    for (let i = 0; i < text.artists.artist.length; ++i) {
      artists.push(text.artists.artist[i].name);
    }
  } else {
    for (let i = 0; i < text.topartists.artist.length; ++i) {
      artists.push(text.topartists.artist[i].name);
    }
  }

  return artists;
}

function filterTopSongs(text) {
  let songs = [];
  text = JSON.parse(text);

  if (text.tracks != undefined) {
    for (let i = 0; i < text.tracks.track.length; ++i) {
      songs.push(text.tracks.track[i].name);
    }
  } else {
    for (let i = 0; i < text.toptracks.track.length; ++i) {
      songs.push(text.toptracks.track[i].name);
    }
  }

  return songs;
}

// testing here
getTopSongs().then((res) => console.log(res));
