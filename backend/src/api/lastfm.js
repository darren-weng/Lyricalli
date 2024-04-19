require("dotenv").config();
const apiKey = process.env.LASTFM_API_KEY;

// fetches the top 100 artists in a country
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

// gives a list of the top 100 artists
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

// testing here
getTopArtists().then((res) => console.log(res));
