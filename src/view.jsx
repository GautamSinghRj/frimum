import { useState, useEffect, useRef, useContext } from "react";
import { MusicContext } from "./musicplayercontext";
import { toggle, repeat, shuffle as shuffleIcon } from './data.js';
import ColorThief from './home/gautam/music_app/node_modules/colorthief/dist/color-thief.mjs';


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

  const imgRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [bgColor, setBgColor] = useState("#000000");

  useEffect(() => {
    if (!aud) return;

    const updateTime = () => setCurrentTime(aud.currentTime);
    aud.addEventListener("timeupdate", updateTime);
    return () => aud.removeEventListener("timeupdate", updateTime);
  }, [aud]);

  
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const handleLoad = () => {
      try {
        const colorThief = new ColorThief();
        const color = colorThief.getColor(img);
        setBgColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
      } catch (e) {
        console.warn("Could not get image color:", e);
      }
    };

    if (img.complete && img.naturalWidth !== 0) {
      handleLoad();
    } else {
      img.addEventListener("load", handleLoad);
      return () => img.removeEventListener("load", handleLoad);
    }
  }, [imageUrl]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const calpercent = () => {
    const [min, sec] = duration?.split(":") || [0, 0];
    const total = parseInt(min) * 60 + parseInt(sec);
    return (currentTime / total) * 100 || 0;
  };

  const fallbackImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfdl-MOe4x_1-wpxRkxJJ6NjjkzeLR2v8BCQ&s";

  return (
    <main>
      <div
        className="w-full h-screen flex flex-col justify-center items-center gap-8"
        style={{ background: `linear-gradient(to bottom, ${bgColor}, #000)` }}
      >
        <span>
          <img
            ref={imgRef}
            crossOrigin="anonymous"
            src={imageUrl || fallbackImage}
            alt="The song"
            className="w-96 h-96 rounded-3xl"
          />
        </span>

        <span className="text-6xl font-black font-serif" title={currentSong}>
          {currentSong}
        </span>

        <span className="flex flex-row transform hover:scale-105 bg-gradient-to-r from-green-400 via-green-500 to-green-600 transition-all duration-300 rounded-full p-2">
          <img className="w-12 h-12" src={shuffle ? shuffleIcon[1].img : shuffleIcon[0].img} alt="Shuffle" onClick={toggleShuffle} />
          <img className="w-12 h-12" src="./pic/previous.png" alt="Previous" onClick={playPreviousSong} />
          <img className="w-12 h-12" src={isPlaying ? toggle[1].img : toggle[0].img} alt={isPlaying ? "Pause" : "Play"} onClick={togglePlay} />
          <img className="w-12 h-12" src="./pic/next.png" alt="Next" onClick={playNextSong} />
          <img className="w-12 h-12" src={loop ? repeat[1].img : repeat[0].img} alt="Repeat" onClick={toggleLoop} />
        </span>

        <span className="flex flex-row justify-center items-center gap-4">
          <span className="text-base">{!aud ? "0:00" : formatTime(currentTime)}</span>
          <div className="w-72 xl:w-96 h-2 bg-green-300 rounded-full">
            <div
              className="h-full transform hover:scale-105 bg-gradient-to-r from-green-400 via-green-500 to-green-600 transition-all duration-300 rounded-full"
              style={{ width: `${calpercent()}%` }}
            ></div>
          </div>
          <span className="text-base">{duration}</span>
        </span>
      </div>
    </main>
  );
}

export default View;
