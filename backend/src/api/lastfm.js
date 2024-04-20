require("dotenv").config();
const apiKey = process.env.LASTFM_API_KEY;

//! maybe find a way to merge getTopArtists and getTopSongs to prevent repetition

// * fetches top 100 artists
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

  // converts text to json
  let topArtists = await response.text();
  topArtists = JSON.parse(topArtists);

  if (topArtists.topartists != undefined) return topArtists.topartists.artist;
  return topArtists.artists.artist;
}

// * fetches top 100 songs
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

  // converts text to json
  let topSongs = await response.text();
  topSongs = JSON.parse(topSongs);

  if (topSongs.toptracks != undefined) return topSongs.toptracks.track;
  return topSongs.tracks.track;
}

// * fetches a correctly spelled artist name
async function searchArtist(artist) {
  let url = "";

  if (artist) {
    url =
      "https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=" +
      artist +
      "&api_key=" +
      apiKey +
      "&format=json";
  } else return "artist required";

  const response = await fetch(url, {
    method: "GET",
  });

  let artistResults = await response.text();
  artistResults = JSON.parse(artistResults);

  return artistResults.results.artistmatches.artist[0].name;
}

// * fetches top tracks of artists
async function getArtistTracks() {
  // CONTINUE LATER
}

// placed for testing purposes
// getTopArtists("united states").then((res) => console.log(res));
searchArtist("tyalor sift").then((res) => console.log(res));
