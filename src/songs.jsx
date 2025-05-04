import Header from "./header";
import Footer from "./footer";
import {MoodCard} from './mood.jsx'
import {ArtistCard} from './artist.jsx'
import { moods, artists } from './data.js';
import { useContext } from "react"; 
import { MusicContext } from "./context/musicContext";

function Songs(){
  const {isPlaying} = useContext(MusicContext);
  if(isPlaying){
  document.querySelector('.song_played_svg').addClass('_on');
  }
    return(
        <div>
          <Header />
          <main>
          <div class="song_played_svg">
       <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
       </svg>
          </div>
          <h1>Find Your Mood!</h1>
          <div className="mood_container">
            {moods.map((mood) => (
              <div key={mood.id} >
                <MoodCard title={mood.title} description={mood.description} img={mood.img} />
              </div>
            ))}
          </div>
    
          <h1 className='second_h1'>Artists To Follow.</h1>
          <div className="artist_container">
            {artists.map((artist) => (
              <ArtistCard key={artist.id} name={artist.name} img={artist.img} />
            ))}
          </div>
        </main>
          <Footer />
          </div>
        
      );
}
export default Songs;