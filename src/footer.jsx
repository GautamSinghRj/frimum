import { useState,useEffect, useContext } from "react";
import { MusicContext } from "./musicplayercontext"; 
import { toggle, repeat, shuffle as shuffleIcon } from './data.js';
import { Link } from "react-router-dom";

function Footer() {
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
    <footer>
      <div className="custom-footer w-full h-24 flex flex-row justify-center items-center gap-2">
      <span className="w-20 h-20 transform -translate-x-96"><img className="rounded-xl" src={imageUrl==null?imagUrl:imageUrl} alt="The song" /></span>
      <span className="overflow-hidden inline-black font-black text-ellipsis whitespace-nowrap transform -translate-x-80" title={currentSong}>{currentSong}</span>
      <span><Link to="/view"><img loading="lazy" src="./pic/fullscreen.png" alt="Watch In fullscreen"/></Link></span>
        <img
          className="w-12 h-12 transform hover:scale(105) transition-all duration-300"
          src={shuffle ? shuffleIcon[1].img : shuffleIcon[0].img}
          alt="Shuffle"
          onClick={toggleShuffle}
        />
        <img
          className="w-12 h-12 transform hover:scale(90) transition-all duration-300"
          src="./pic/previous.png"
          alt="Previous"
          onClick={playPreviousSong}
        />
        <img
          className="w-12 h-12 rounded-full transform hover:scale(105) transition-all duration-300"
          src={isPlaying ? toggle[1].img : toggle[0].img}
          alt={isPlaying ? "Pause" : "Play"}
          onClick={togglePlay}
          style={{ backgroundColor: 'gray' }}
        />
        <img
          className="w-12 h-12 transform hover:scale(90) transition-all duration-300"
          src="./pic/next.png"
          alt="Next"
          onClick={playNextSong}
        />
        <img
          className="w-12 h-12 transform hover:scale(105) transition-all duration-300"
          src={loop ? repeat[1].img : repeat[0].img}
          alt="Repeat"
          onClick={toggleLoop}
        />
        <span className="text-base" style={{translate: '22rem'}}>{!aud?"0:00":formatTime(currentTime)}</span>
         <div className="hidden xl:inline xl:w-96 h-2 bg-green-300 rounded-full" style={{translate: '22rem'}}>
          <div className="h-full transform hover:scale-105 bg-gradient-to-r from-green-400 via-green-500 to-green-600 transition-all duration-300 rounded-full" style={{ width: `${calpercent()}%` }}></div>
        </div>
        <span className="text-base" style={{translate: '22rem'}}>{duration}</span>
      </div>
    </footer>
  );
}

export default Footer;
