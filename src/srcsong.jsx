import Footer from "./footer";
import Header from "./header";
import { useContext } from "react";
import { MusicContext } from "./musicplayercontext";

function SrcSong(){
    const { playSong,inputValue } = useContext(MusicContext);
    const postInputChange = async()=>{ 
        const res=await fetch("https://frimum.onrender.com/Song",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"  
          },
        body: JSON.stringify({ inputValue }),     
    });
    const song = await res.json();
    const query = encodeURIComponent(song.name);
    const response = await fetch(`https://itunes.apple.com/search?term=${query}&entity=song&limit=1`);
    const data = await response.json();
    image = data.results?.[0]?.artworkUrl100?.replace('100x100', '1200x1200'); 
    }
    return(
        <div>
            <Header/>
            <main>
                <img src={image} alt="Searched Song Image" />
                <h1 onClick={() => playSong(song.link, song.id,song.name,song,song.length)}>{song.name}</h1>
                <p>{song.length}</p>
            </main>
            <Footer/>
        </div>
    )
}
export default SrcSong;