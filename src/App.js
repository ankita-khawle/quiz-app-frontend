import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {LayoutWrapper} from "./components/index"

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="*" element={<LayoutWrapper/>} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
