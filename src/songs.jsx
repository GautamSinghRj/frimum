import Header from "./header";
import Footer from "./footer";
import {MoodCard} from './mood.jsx'
import {ArtistCard} from './artist.jsx'
import { moods, artists } from './data.js';


function Songs(){
    return(
        <div>
          <Header />
          <main className="pt-40 md:pt-24 xl:pt-24">
          <h1 className="w-full font-bebas font-black translate-x-16 transform text-4xl 
          md:text-4xl xl:text-4xl hover:underline transform transition-all duration-300 ease-in-out">Find Your Mood!</h1>
          <div className="p-10 flex flex-col md:flex-row xl:flex-row justify-center items-center gap-10 md:gap-20 xl:gap-28">
            {moods.map((mood) => (
              <div key={mood.id} >
                <MoodCard title={mood.title} description={mood.description} img={mood.img} />
              </div>
            ))}
          </div>
    
          <h1 className='w-full font-bebas font-black translate-x-16 transform text-4xl 
          md:text-4xl xl:text-4xl hover:underline transform transition-all duration-300 ease-in-out'>Artists To Follow.</h1>
          <div className="p-10 flex flex-row justify-center items-center flex-wrap gap-12 md:gap-16 xl:gap-18">
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