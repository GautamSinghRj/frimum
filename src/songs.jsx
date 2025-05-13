import Header from "./header";
import Footer from "./footer";
import {MoodCard} from './mood.jsx'
import {ArtistCard} from './artist.jsx'
import { moods, artists } from './data.js';
import { motion } from "framer-motion";

function Songs(){
    return(
        <div>
          <Header />
          <main>
          <motion.h1 whileHover={{textDecoration:'underline'}} onHoverEnd={{textDecoration:'none'}} className="w-full font-bebas font-black translate-x-16 transform text-4xl 
          md:text-4xl xl:text-4xl">Find Your Mood!</motion.h1>
          <div className="p-10 flex flex-col md:flex-row xl:flex-row justify-center items-center gap-10 md:gap-20 xl:gap-28">
            {moods.map((mood) => (
              <div key={mood.id} >
                <MoodCard title={mood.title} description={mood.description} img={mood.img} />
              </div>
            ))}
          </div>
    
          <motion.h1 whileHover={{textDecoration:'underline'}} onHoverEnd={{textDecoration:'none'}} className='w-full font-bebas font-black translate-x-16 transform text-4xl 
          md:text-4xl xl:text-4xl'>Artists To Follow.</motion.h1>
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