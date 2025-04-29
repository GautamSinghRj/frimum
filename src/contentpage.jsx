import { useLocation, useParams } from "react-router-dom";
import MoodPage from "./moodpage";
import ArtistPage from "./artistpage";

function ContentPage(){
    const {content} =useParams();
    const location= useLocation();
    const type = new URLSearchParams(location.search).get('type');

    if (type === 'artist') {
        return <ArtistPage artistName={content} />;
      } else {
        return <MoodPage moodTitle={content} />;
      }
    }
    
export default ContentPage;