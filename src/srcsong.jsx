import Footer from "./footer";
import Header from "./header";
import { useContext } from "react";
import { MusicContext } from "./musicplayercontext";
import { useState,useEffect} from "react";

function SrcSong(){
    const { playSong,inputValue } = useContext(MusicContext);

    const [song, setSong] = useState(null);
    const [image, setImage] = useState(null);

    const postInputChange = async () => { 
        try {
        const res = await fetch("https://frimum.onrender.com/Song", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"  
            },
            body: JSON.stringify({ inputValue }),     
        });
    
        if (!res.ok) return;
    
        const songData = await res.json();
        setSong(songData);
    
        const query = encodeURIComponent(songData.name);
        const response = await fetch(`https://itunes.apple.com/search?term=${query}&entity=song&limit=1`);
        const data = await response.json();
        const baseimg = data.results?.[0]?.artworkUrl100?.replace('100x100', '1200x1200'); 
    
        if (baseimg) {
            setImage(baseimg);
        }    
    }
        catch (error) {
            console.error("Error fetching song data:", error);
        }
    };
    
useEffect(() => {
    if (!inputValue) {
        return;
    }
    postInputChange();
}, [inputValue]);

    return(
        <div>
            <Header/>
            <main>

             {song && (
                    <>
             <img src={image} alt="Searched Song" className="searched_song_img" />
             <h1 onClick={() => playSong(song.link, song.id, song.name, song, song.length)} className="searched_song_name">
             {song.name}
             </h1>
            <p className="searched_song_len">{song.length}</p>
                </>
         )}


            </main>
            <Footer/>
        </div>
    )
}
export default SrcSong;