
import { BrowserRouter as Router } from "react-router-dom";
import {AnimatedRoutes} from "./animatedRoutes"

function App() {
  return (
  <div>
    <Router>
      <AnimatedRoutes />
    </Router>
  </div>
  );
}

export default App;
