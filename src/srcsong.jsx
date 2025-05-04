import { useEffect, useState } from "react";
import Header from "./header";
import Footer from "./footer";
import { useContext } from "react";
import { MusicContext } from "./context/musicContext";

function SrcSong({ song }) {
  const { playSong } = useContext(MusicContext);
  const [songData, setSongData] = useState(null);
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchSong = async () => {
      const songDetails = await song(); 
      if (!songDetails || !songDetails.name) return;

      const query = encodeURIComponent(songDetails.name);
      const response = await fetch(`https://itunes.apple.com/search?term=${query}&entity=song&limit=1`);
      const data = await response.json();
      const img = data.results?.[0]?.artworkUrl100?.replace('100x100', '1200x1200');

      setImage(img);
      setSongData(songDetails);
    };

    fetchSong();
  }, [song]);

  if (!songData) return <div><Header /><main>Loading...</main><Footer /></div>;

  return (
    <div>
      <Header />
      <main>
        {image && <img src={image} alt="Searched Song" />}
        <h1 onClick={() => playSong(songData.link, songData.id, songData.name, songData, songData.length)}>
          {songData.name}
        </h1>
        <p>{songData.length}</p>
      </main>
      <Footer />
    </div>
  );
}

export default SrcSong;
