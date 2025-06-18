import { createContext, useState, useRef, useEffect } from "react";
import { key } from "./key";

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loop, setLoop] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [songlist, setSonglist] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [duration, setDuration] = useState("0:00");
  const [aud, setAud] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const audioRef = useRef(new Audio());
  const [logged,setLogged] =useState(false);
 
  useEffect(() => {
    audioRef.current.loop = loop;
  }, [loop]);


  useEffect(() => {
    audioRef.current.onended = () => {
      if (!loop) {
        playNextSong();
      }
    };
  }, [loop, currentIndex, songlist, shuffle]);

  const playSong = async (songLink, index, name, playlist = [],len) => {
    const audio = audioRef.current;
    audio.src = songLink;
    setAud(audio);
    try {
      await audio.play();
      setCurrentSong(name);
      setIsPlaying(true);
      setCurrentIndex(index);
      if (playlist.length > 0) setSonglist(playlist);
      if(duration ==="0:00"||duration!==len)setDuration(len);
      setImageUrl(null);
  
      
      const query = encodeURIComponent(name);
      const response = await fetch(`https://itunes.apple.com/search?term=${query}&entity=song&limit=1`);
      const data = await response.json();
      
      const image = data.results?.[0]?.artworkUrl100?.replace('100x100', '1200x1200'); 
      if (image) {
        setImageUrl(image);
      }
    } catch (err) {
      console.error("Playback or image fetch error:", err);
    }
    
  };
  
   
  
  const pauseSong = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseSong();
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleLoop = () => setLoop((prev) => !prev);
  const toggleShuffle = () => setShuffle((prev) => !prev);

  const playNextSong = async() => {
    if (songlist.length === 0) return;

    let nextIndex;

    const response =await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + key,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistralai/mistral-small-3.1-24b-instruct:free",
        messages: [
          {
            role: "system",
            content: "You are a music recommender. Suggest the next best song according to the mood of the song from the given playlist. Respond ONLY with the full song object in JSON format."
          }
          ,
          {
            role: "user",
            content: `Playlist: ${JSON.stringify(songlist)}. Current song: ${JSON.stringify(currentSong)}. Recommend the next song from the list. Return only one song from the list.`,
          },
        ],
      }),
    });
    
const result = await response.json();

if (!result?.choices?.[0]?.message?.content) {
  console.error("Invalid response from OpenRouter:", result);
  return;
}

const rawContent = result.choices[0].message.content.trim();

try {
  const cleanedContent = rawContent.replace(/```json|```/g, "").trim();
  const suggestion = JSON.parse(cleanedContent);

  if (shuffle) {
    playSong(suggestion.link, suggestion.id, suggestion.name, songlist, suggestion.length);
  } else {
    nextIndex = currentIndex + 1 < songlist.length ? currentIndex + 1 : 0;
    const nextSong = songlist[nextIndex];
    playSong(nextSong.link, nextIndex, nextSong.name, songlist, nextSong.length);
  }
} catch (e) {
  console.error("Error parsing AI response:", e, rawContent);
}
  }

  const playPreviousSong = () => {
    if (songlist.length === 0) return;

    const prevIndex = currentIndex - 1 < 0 ? songlist.length - 1 : currentIndex - 1;
    playSong(songlist[prevIndex].link, prevIndex, songlist[prevIndex].name, songlist);
  };

  return (
    <MusicContext.Provider
      value={{
        logged,
        setLogged,
        inputValue,
        setInputValue,
        aud,
        duration,
        imageUrl,
        currentSong,
        isPlaying,
        playSong,
        pauseSong,
        togglePlay,
        loop,
        shuffle,
        toggleLoop,
        toggleShuffle,
        playNextSong,
        playPreviousSong,
        currentIndex,
        songlist,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
