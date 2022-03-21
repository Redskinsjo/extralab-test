import Header from "./components/header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/home";
import Favorites from "./components/favorites";

function App() {
  return (
    <Router>
      <div className="h-full w-full">
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/favorites" element={<Favorites />}></Route>
          <Route path="/actors/:id"></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
