import Footer from "./footer";
import Header from "./header";
import { useEffect, useState, useContext } from "react";
import { MusicContext } from "./musicplayercontext";
import { moods } from "./data";

function MoodPage({moodTitle}) {
    const [fetched_songs, setFetchedState] = useState([]);
    const { playSong } = useContext(MusicContext);
    const mood = moods.find((m) => m.title === moodTitle); 

     useEffect(() => {
        fetch(`https://frimum.onrender.com/${mood.title.split(" ")[0]}`)
          .then((response) => response.json())
          .then((data) => {
            setFetchedState(data);
          })
          .catch((error) => {
            console.error('Error fetching artist data:', error);
          });
      }, [mood.title]);

  return (
    <div>
      <Header />
      <main>
        <div className="moodpage_section" style={{backgroundColor: mood ? mood.color : "#fff"}}>
        {mood ? (
          <img loading="lazy" className="indivual_img" src={mood.img} alt={mood.title} />
        ) : (
          <p>Mood not found</p>
        )}
          <p className="description">Public Playlist</p>
          <p className="mood_heading">{mood.title}</p>
          <p className="artist_info">multiple artists</p>
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

export default MoodPage;
