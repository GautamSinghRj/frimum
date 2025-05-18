import { useState,useEffect, useContext } from "react";
import { MusicContext } from "./musicplayercontext"; 
import { toggle, repeat, shuffle as shuffleIcon } from './data.js';
import { Link } from "react-router-dom";
import { main } from "framer-motion/client";
function View() {
     const {
    aud,
    duration,
    imageUrl,
    currentSong,
    isPlaying,
    togglePlay,
    toggleLoop,
    toggleShuffle,
    playNextSong,
    playPreviousSong,
    loop,
    shuffle
  } = useContext(MusicContext);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (!aud) return;

    const updateTime = () => {
      setCurrentTime(aud.currentTime);
    };

    aud.addEventListener("timeupdate", updateTime);

    return () => {
      aud.removeEventListener("timeupdate", updateTime);
    };
  }, [aud]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };
  const calpercent=()=>{
    const totalduration = parseInt(duration.split(":")[0] * 60) + parseInt(duration.split(":")[1]);
    const currentduration = parseInt(currentTime);
    const percent = (currentduration / totalduration) * 100;
    return percent;
  }
  const imagUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfdl-MOe4x_1-wpxRkxJJ6NjjkzeLR2v8BCQ&s";
  return (
    <main>
      <div className="w-full h-screen flex flex-col justify-center items-center gap-4">
      <span><img src={imageUrl==null?imagUrl:imageUrl} alt="The song" className="w-96 h-96 rounded-3xl" /></span>
      <span className="text-6xl font-black font-serif" title={currentSong}>{currentSong}</span>
        <span className="flex flex-row">
        <img
          className="w-12 h-12"
          src={shuffle ? shuffleIcon[1].img : shuffleIcon[0].img}
          alt="Shuffle"
          onClick={toggleShuffle}
        />
        <img
          className="w-12 h-12"
          src="./pic/previous.png"
          alt="Previous"
          onClick={playPreviousSong}
        />
        <img
          className="w-12 h-12"
          src={isPlaying ? toggle[1].img : toggle[0].img}
          alt={isPlaying ? "Pause" : "Play"}
          onClick={togglePlay}
        />
        <img
          className="w-12 h-12"
          src="./pic/next.png"
          alt="Next"
          onClick={playNextSong}
        />
        <img
          className="w-12 h-12"
          src={loop ? repeat[1].img : repeat[0].img}
          alt="Repeat"
          onClick={toggleLoop}
        />
        
        </span>
        <span className="start_len">{!aud?"0:00":formatTime(currentTime)}</span>
         <div className="progress_bar">
          <div className="progress_fill" style={{ width: `${calpercent()}%` }}></div>
        </div>
        <span className="end_len">{duration}</span>
      </div>
    </main>
  );
}
export default View;