import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import AudioPlayer from "../Audio/AudioPlayer"; // Adjust this path as needed
import "./App.css";
import CoffeeShop from "./CoffeeShop/CoffeeShop.js";
import MainMenu from "./MainMenu/MainMenu.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/mainmenu" replace />} />
          <Route path="coffeeShop" element={<CoffeeShop />} />
          <Route path="audioPlayer" element={<AudioPlayer />} />
          <Route path="mainMenu" element={<MainMenu />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
