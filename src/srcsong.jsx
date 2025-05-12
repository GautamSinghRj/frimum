import Footer from "./footer";
import Header from "./header";
import { useContext, useState, useEffect } from "react";
import { MusicContext } from "./musicplayercontext";
import { key } from "./key";
import { useDebounce } from "use-debounce";

function SrcSong() {
    const { playSong, inputValue } = useContext(MusicContext);
    const [debouncedInput] = useDebounce(inputValue, 500);
    const [sugg_songs, setSugg] = useState(null);
    const [song, setSong] = useState(null);
    const [image, setImage] = useState(null);
    const [loadingSuggestions, setLoadingSuggestions] = useState(false);

    useEffect(() => {
        if (!debouncedInput) return;

        const controller = new AbortController();

        const fetchSongFromBackend = async () => {
            const res = await fetch("https://frimum.onrender.com/Song", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ inputValue: debouncedInput }),
                signal: controller.signal
            });
            if (!res.ok) return null;
            return await res.json();
        };

        const fetchItunesImage = async (songName) => {
            const query = encodeURIComponent(songName);
            const res = await fetch(`https://itunes.apple.com/search?term=${query}&entity=song&limit=1`, {
                signal: controller.signal
            });
            if (!res.ok) return null;
            const data = await res.json();
            return data.results?.[0]?.artworkUrl100?.replace('100x100', '1200x1200') || null;
        };

        const fetchPlaylist = async () => {
            const res = await fetch("https://frimum.onrender.com/getSong", {
                signal: controller.signal
            });
            if (!res.ok) return null;
            return await res.json();
        };

        const fetchSuggestions = async (playlist, songName) => {
            setLoadingSuggestions(true);
            const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + key,
                    "Content-Type": "application/json",
                    "HTTP-Referer": window.location.origin,
                    "X-Title": "Music Recommendations App",
                },
                body: JSON.stringify({
                    model: "mistralai/mistral-7b-instruct:free",
                    messages: [
                        {
                            role: "system",
                            content:
                                "You are a music recommender. Suggest three alike songs according to the mood and vibe of the song from the given song. Respond ONLY with the full song object from the playlist in JSON format.",
                        },
                        {
                            role: "user",
                            content: `Playlist: ${JSON.stringify(playlist)}. Current song: ${JSON.stringify(songName)}. Recommend and return three songs object from the list.`,
                        },
                    ],
                }),
                signal: controller.signal
            });

            if (!res.ok) return;
            const result = await res.json();
            const rawContent = result.choices?.[0]?.message?.content?.trim();
            if (!rawContent) return;

            const cleanedContent = rawContent
                .replace(/```json|```/g, "")
                .replace(/,\s*}/g, "}")
                .replace(/,\s*]/g, "]")
                .trim();

            try {
                const parsed = JSON.parse(cleanedContent);
                if (Array.isArray(parsed)) {
                    setSugg(parsed);
                } else {
                    console.warn("Suggestions were not an array:", parsed);
                }
            } catch (e) {
                console.error("Failed to parse suggestions:", e);
            } finally {
                setLoadingSuggestions(false);
            }
        };

        const fetchData = async () => {
            try {
                const songData = await fetchSongFromBackend();
                if (!songData?.name) return;

                setSong(songData);

                const [imageUrl, playlist] = await Promise.all([
                    fetchItunesImage(songData.name),
                    fetchPlaylist()
                ]);

                if (imageUrl) setImage(imageUrl);
                if (playlist) await fetchSuggestions(playlist, songData.name);

            } catch (error) {
                if (error.name !== "AbortError") console.error("Error fetching song data:", error);
            }
        };

        fetchData();

        return () => controller.abort();
    }, [debouncedInput]);

    return (
        <div>
            <Header />
            <main>
                {song && (
                    <>
                        {image && (
                            <img src={image} alt="Searched Song" className="searched_song_img" />
                        )}
                        <h1
                            onClick={() =>
                                playSong(song.link, song.id, song.name, song, song.length)
                            }
                            className="searched_song_name"
                        >
                            {song.name}
                        </h1>
                        <p className="searched_song_len">{song.length}</p>

                        {loadingSuggestions && <p>Loading recommendations...</p>}

                        {Array.isArray(sugg_songs) &&
                            sugg_songs.map((songs, index) => (
                                <div key={songs.id || index}>
                                    <h1
                                        onClick={() =>
                                            playSong(songs.link, index, songs.name, sugg_songs, songs.length)
                                        }
                                    >
                                        {songs.name}
                                    </h1>
                                    <p>{songs.length}</p>
                                </div>
                            ))}
                    </>
                )}
            </main>
            <Footer />
        </div>
    );
}

export default SrcSong;
