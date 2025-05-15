import { artists } from "./data";
import Header from "./header";
import Footer from "./footer";
import { useEffect, useState, useContext } from "react";
import { MusicContext } from "./musicplayercontext";

function ArtistPage({ artistName }) {
  const [fetched_songs, setFetchedState] = useState([]);
  const { playSong } = useContext(MusicContext);
  const artist = artists.find((a) => a.name === artistName);


  useEffect(() => {
    if (!artist.name) return;

    fetch(`https://frimum.onrender.com/${artist.name.split(" ")[0]}`)
      .then((response) => response.json())
      .then((data) => {
        setFetchedState(data);
      })
      .catch((error) => {
        console.error('Error fetching artist data:', error);
      });
  }, [artist.name]); 
  return (
    <div>
      <Header />
      <main>
        <div className="artistpage_section" style={{ backgroundColor: artist ? artist.color : "#fff" }}>
          {artist ? (
            <img loading="lazy" className="artist_img" src={artist.img} alt={artist.name} />
          ) : (
            <p>Artist not found</p>
          )}
          <p className="diff_description">Public Playlist</p>
          <p className="artist_heading">{artist.name}</p>
          <p className="singer_info">songs by {artist.name.toLowerCase()}</p>
        </div>

        <div className="songs_table">
          {fetched_songs.length > 0 ? (
           <div className="songs_header">
            <span>#</span>
            <span>Title</span>
            <span>Length</span>
            </div>
            ) : (
            <p>No songs available</p>
            )}

            {fetched_songs.map((song, index) => (
            <div className="song_row" key={index}>
              <span>{index + 1}</span>
              <span className="song_title" onClick={() => playSong(song.link, index,song.name,fetched_songs,song.length)}>{song.name}
              </span>
              <span>{song.length}</span>
            </div>
            ))}
        </div>

      </main>
      <Footer />
    </div>
  );
}

export default ArtistPage;
