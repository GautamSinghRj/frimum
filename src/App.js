
import Songs from "./songs";
import ContentPage from "./contentpage"
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import Success from "./success";
import Failed from "./failed";
import SrcSong from "./srcsong";
import { postInputChange } from "./header";

function App() {
  return (
  <div>
    <Router>
      <Routes>
        <Route path="/" element={<Songs />} />
        <Route path="/:content" element={<ContentPage />} />
        <Route path="/success" element={<Success />} />
        <Route path="/failed" element={<Failed />} />
        <Route path="/srcsong" element={  <SrcSong song={postInputChange()} />} />
      </Routes>   
    </Router>

  </div>
  );
}

export default App;
