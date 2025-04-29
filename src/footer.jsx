import { useState,useEffect, useContext } from "react";
import { MusicContext } from "./musicplayercontext"; 
import { toggle, repeat, shuffle as shuffleIcon } from './data.js';


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
      <div className="music_controls">
      <span className="song_img"><img src={imageUrl==null?imagUrl:imageUrl} alt="The song" /></span>
      <span className="song_name" title={currentSong}>{currentSong}</span>

        <img
          className="shuffle"
          src={shuffle ? shuffleIcon[1].img : shuffleIcon[0].img}
          alt="Shuffle"
          onClick={toggleShuffle}
        />
        <img
          className="previous"
          src="./pic/previous.png"
          alt="Previous"
          onClick={playPreviousSong}
        />
        <img
          className="play"
          src={isPlaying ? toggle[1].img : toggle[0].img}
          alt={isPlaying ? "Pause" : "Play"}
          onClick={togglePlay}
        />
        <img
          className="next"
          src="./pic/next.png"
          alt="Next"
          onClick={playNextSong}
        />
        <img
          className="repeat"
          src={loop ? repeat[1].img : repeat[0].img}
          alt="Repeat"
          onClick={toggleLoop}
        />
        <span className="start_len">{!aud?"0:00":formatTime(currentTime)}</span>
         <div className="progress_bar">
          <div className="progress_fill" style={{ width: `${calpercent()}%` }}></div>
        </div>
        <span className="end_len">{duration}</span>
      </div>
    </footer>
  );
}

export default Footer;
