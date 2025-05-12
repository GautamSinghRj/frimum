import Footer from "./footer";
import Header from "./header";
import { useContext } from "react";
import { MusicContext } from "./musicplayercontext";
import { useState, useEffect } from "react";
import { key } from "./key";

function SrcSong() {
  const { playSong, inputValue } = useContext(MusicContext);
  const [sugg_songs, setSugg] = useState(null);
  const [song, setSong] = useState(null);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const postInputChange = async () => {
    try {
      // Reset states when starting a new search
      setError(null);
      
      // Fetch the main song
      const res = await fetch("https://frimum.onrender.com/Song", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputValue }),
      });

      if (!res.ok) {
        setError("Failed to fetch song data");
        return;
      }

      const songData = await res.json();
      setSong(songData);
      console.log("Main song fetched:", songData);

      // Fetch album artwork
      try {
        const query = encodeURIComponent(songData.name);
        const response = await fetch(`https://itunes.apple.com/search?term=${query}&entity=song&limit=1`);
        const data = await response.json();
        const baseimg = data.results?.[0]?.artworkUrl100?.replace('100x100', '1200x1200');

        if (baseimg) {
          setImage(baseimg);
          console.log("Image URL set:", baseimg);
        } else {
          console.log("No image found for the song");
        }
      } catch (imageError) {
        console.error("Error fetching image:", imageError);
        // Continue with the rest of the function even if image fetch fails
      }

      // Fetch song suggestions
      try {
        const response2 = await fetch('https://frimum.onrender.com/getSong');
        
        if (!response2.ok) {
          console.error("Failed to fetch song database for suggestions");
          return;
        }
        
        const playlist = await response2.json();
        console.log("Playlist fetched for suggestions:", playlist);
        
        // Call OpenRouter AI for suggestions
        const suggestion = await fetch("https://openrouter.ai/api/v1/chat/completions", {
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
                content: "You are a music recommender. Suggest three alike songs according to the mood and vibe of the song from the given song. Respond ONLY with the full song object from the playlist in JSON format as an array of objects."
              },
              {
                role: "user",
                content: `Playlist: ${JSON.stringify(playlist)}. Current song: ${JSON.stringify(songData.name)}. Recommend and return three songs object from the list as a JSON array.`,
              },
            ],
          }),
        });

        if (!suggestion.ok) {
          console.error("Failed to get suggestions from AI");
          return;
        }

        const result = await suggestion.json();
        console.log("Raw AI response:", result);
        
        if (result.choices && result.choices[0] && result.choices[0].message && result.choices[0].message.content) {
          const rawContent = result.choices[0].message.content.trim();
          console.log("Raw content from AI:", rawContent);
          
          // More robust JSON extraction
          let jsonContent;
          
          // Try to find JSON content within markdown code blocks
          const jsonMatch = rawContent.match(/```(?:json)?([\s\S]*?)```/);
          if (jsonMatch && jsonMatch[1]) {
            jsonContent = jsonMatch[1].trim();
          } else {
            // If no code blocks, use the whole content
            jsonContent = rawContent;
          }
          
          // Remove any explanatory text outside of brackets
          jsonContent = jsonContent.replace(/^[\s\S]*?(\[[\s\S]*\])[\s\S]*$/, '$1');
          
          // If that doesn't work, look for content between square brackets
          if (!jsonContent.startsWith('[')) {
            const arrayMatch = rawContent.match(/\[([\s\S]*)\]/);
            if (arrayMatch) {
              jsonContent = `[${arrayMatch[1]}]`;
            }
          }
          
          console.log("Attempting to parse:", jsonContent);
          
          try {
            const parsedSuggestions = JSON.parse(jsonContent);
            console.log("Successfully parsed suggestions:", parsedSuggestions);
            setSugg(parsedSuggestions);
          } catch (parseError) {
            console.error("JSON parse error:", parseError);
            console.error("Failed to parse content:", jsonContent);
            setError("Failed to parse song suggestions");
          }
        } else {
          console.error("Invalid response structure from AI");
          setError("Invalid response from suggestion service");
        }
      } catch (suggestionError) {
        console.error("Error fetching song suggestions:", suggestionError);
        setError("Error fetching song suggestions");
      }
    } catch (error) {
      console.error("Error in main song fetch process:", error);
      setError("Failed to process your request");
    }
  };

  useEffect(() => {
    if (!inputValue) {
      return;
    }
    postInputChange();
  }, [inputValue]);

  return (
    <div>
      <Header />
      <main className="song-container">
        {error && <p className="error-message">{error}</p>}
        
        {song && (
          <div className="song-main">
            <img src={image || "./pic/default-album.png"} alt="Searched Song" className="searched_song_img" />
            <div className="song-details">
              <h1 
                onClick={() => playSong(song.link, song.id, song.name, song, song.length)} 
                className="searched_song_name"
              >
                {song.name}
              </h1>
              <p className="searched_song_len">{song.length}</p>
            </div>
          </div>
        )}

        {Array.isArray(sugg_songs) && sugg_songs.length > 0 && (
          <div className="suggestions-container">
            <h2 className="suggestions-title">Suggestions</h2>
            {sugg_songs.map((songItem, index) => (
              <div className="suggestion-item" key={index}>
                <h3 
                  onClick={() => playSong(songItem.link, index, songItem.name, sugg_songs, songItem.length)}
                  className="suggestion-name"
                >
                  {songItem.name}
                </h3>
                <p className="suggestion-length">{songItem.length}</p>
              </div>
            ))}
          </div>
        )}

        {song && (!Array.isArray(sugg_songs) || sugg_songs.length === 0) && (
          <p className="no-suggestions">No suggestions available</p>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default SrcSong;