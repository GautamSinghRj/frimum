import Footer from "./footer";
import Header from "./header";
import { useEffect, useState, useContext,useRef } from "react";
import { MusicContext } from "./musicplayercontext";
import { moods } from "./data";

function MoodPage({moodTitle}) {
    const fetchedRef = useRef(null);
    const [fetched_songs, setFetchedState] = useState([]);
    const { playSong } = useContext(MusicContext);
    const mood = moods.find((m) => m.title === moodTitle); 
useEffect(() => {
 
      if (fetchedRef.current === mood.title) return;
      fetchedRef.current = mood.title;

  fetch(`https://frimum.onrender.com/api/${mood.title.split(" ")[0]}`)
    .then((response) => response.json())
    .then((data) => {
      setFetchedState(data);
    })
    .catch((error) => {
      if (error.name !== 'AbortError') {
        console.error('Error fetching artist data:', error);
      }
    });


}, [mood.title]);

  return (
   <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <main className="custom-scrollbar flex-1 mt-96 md:mt-28 xl:mt-28 overflow-y-scroll overflow-x-hidden">
        <div className="w-full h-96 py-8" style={{backgroundColor: mood ? mood.color : "#fff"}}>
        {mood ? (
          <img loading="lazy" className="w-auto h-80 rounded-xl float-left transform translate-x-6" src={mood.img} alt={mood.title} />
        ) : (
          <p>Mood not found</p>
        )}
          <p className="text-white italic font-medium text-2xl transform translate-x-28 translate-y-40">Public Playlist</p>
          <p className="text-white text-8xl transform translate-x-24">{mood.title}</p>
          <p className="text-white italic font-medium text-2xl transform translate-x-28 translate-y-20">multiple artists</p>
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
