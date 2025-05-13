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
          <h1 className="font-bebas font-black xl:translate-x-16 text-xl md:text-4xl xl:text-4xl w-3xs">Find Your Mood!</h1>
          <div className="p-10 flex flex-col md:flex-row xl:flex-row justify-center items-center gap-10 md:gap-20 xl:gap-28">
            {moods.map((mood) => (
              <div key={mood.id} >
                <MoodCard title={mood.title} description={mood.description} img={mood.img} />
              </div>
            ))}
          </div>
    
          <h1 className='second_h1'>Artists To Follow.</h1>
          <div className="flex flex-row justify-center items-center flex-wrap gap-12 md:gap-16 xl:gap-20">
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