
import Songs from "./songs";
import ContentPage from "./contentpage"
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import Success from "./success";
import Failed from "./failed";


function App() {
  return (
  <div>
    <Router>
      <Routes>
        <Route path="/" element={<Songs />} />
        <Route path="/:content" element={<ContentPage />} />
        <Route path="/success" element={<Success />} />
        <Route path="/failed" element={<Failed />} />
      </Routes>   
    </Router>

  </div>
  );
}

export default App;
