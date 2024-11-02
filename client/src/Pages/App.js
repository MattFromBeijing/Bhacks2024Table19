import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AudioPlayer from "/Users/pretzelr/Documents/GitHub/Hackathon/BostonHacks24/Bhacks2024Table19/client/src/Audio/AudioPlayer.js"; // Adjust this path as needed
import "./App.css"; // Keep your existing styles

import "./App.css";
import CoffeeShop from "./CoffeeShop/CoffeeShop.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/coffeeshop" replace />} />
          <Route path="coffeeShop" element={<CoffeeShop />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
