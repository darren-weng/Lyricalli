import {
  searchArtists,
  searchMusics,
  searchAlbums,
  listMusicsFromAlbum,
} from "node-youtube-music";

async function searchArtist(artist) {
  const artists = await searchArtists(artist);
  return artists[0];
}

export async function searchMusic(title) {
  const music = await searchMusics(title);
  return music[0];
}

async function searchAlbum(album) {
  const albums = await searchAlbums(album);
  return albums[0].albumId;
}

// requires id passed from searchAlbum
//! gives a typeerror
async function listAlbumSongs(albumId) {
  const albumSongs = await listMusicsFromAlbum(albumId);
  console.log(albumSongs);
  return albumSongs;
}

//* search album works then gives an error at listAlbumSongs
/**
searchAlbum("the tortured poets department").then((res) => {
  listAlbumSongs(res);
});
*/

searchMusic("never gonna give you up").then((res) => console.log(res));
