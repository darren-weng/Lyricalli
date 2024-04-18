require("dotenv").config();
const apiKey = process.env.LASTFM_API_KEY;

// fetches the top 100 artists in a country
async function getTopArtists(country) {
  country = encodeURIComponent(country);
  const url =
    "https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=" +
    country +
    "&limit=100" +
    "&api_key=" +
    apiKey +
    "&format=json";

  const response = await fetch(url, {
    method: "GET",
  });

  const topArtists = await response.text();
  return filterTopArtists(topArtists);
}

// gives a list of the top 100 artists
function filterTopArtists(text) {
  let artists = [];
  text = JSON.parse(text);

  for (let i = 0; i < text.topartists.artist.length; ++i) {
    artists.push(text.topartists.artist[i].name);
  }

  return artists;
}

// testing here
getTopArtists("united states").then((res) => console.log(res));
