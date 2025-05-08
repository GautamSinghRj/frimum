import Footer from "./footer";
import Header from "./header";
import { useContext } from "react";
import { MusicContext } from "./musicplayercontext";
import { useState,useEffect} from "react";
import { key } from "./key";

function SrcSong(){
    const { playSong,inputValue } = useContext(MusicContext);
    const [sugg_songs,setSugg]=useState(null);
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

        const  response2=await fetch('https://frimum.onrender.com/getSong');

        if(response2.ok){
        const playlist = await response2.json();
        const suggestion=await fetch("https://openrouter.ai/api/v1/chat/completions",{
            method: "POST",
            headers: { Authorization: "Bearer " + key,
                    "Content-Type": "application/json",
        },
          body: JSON.stringify({
            model:"mistralai/mistral-small-3.1-24b-instruct:free",
            messages:   [{
                role: "system",
                content: "You are a music recommender. Suggest three alike songs according to the mood and vibe of the song from the given song. Respond ONLY with the full song object from the playlist in JSON format."
              }
              ,
              {
                role: "user",
                content: `Playlist: ${JSON.stringify(playlist)}. Current song: ${JSON.stringify(inputValue)}. Recommend and return three songs from the list.`,
              },
            ],
        }),
    });
    const result = await suggestion.json();
    const rawContent = result.choices[0].message.content.trim();
    const cleanedContent = rawContent.replace(/```json|```/g, "").trim();
    setSugg(JSON.parse(cleanedContent));
    useEffect(() => {
        if (sugg_songs) {
            console.log("Updated Suggestions:", sugg_songs);
        }
    }, [sugg_songs]);
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

            {Array.isArray(sugg_songs) && sugg_songs.map((songs,index)=>(
                <div>
                    <h1 onClick={() => playSong(songs.link, index, songs.name, sugg_songs, songs.length)}>{songs.name}</h1>
                <p>{songs.length}</p>
                </div>
        ))}
                </>
         )}


            </main>
            <Footer/>
        </div>
    )
}
export default SrcSong;