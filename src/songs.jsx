import Header from "./header";
import Footer from "./footer";
import {MoodCard} from './mood.jsx'
import {ArtistCard} from './artist.jsx'
import { moods, artists } from './data.js';

function Songs(){
    return(
        <div>
          <Header />
          <main>
          <h1>Find Your Mood!</h1>
          <div className="flex flex-row justify-center items-center gap-20">
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