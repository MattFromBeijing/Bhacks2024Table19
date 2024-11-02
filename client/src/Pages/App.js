import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AudioPlayer from "/Users/pretzelr/Documents/GitHub/Hackathon/BostonHacks24/Bhacks2024Table19/client/src/Audio/AudioPlayer.css"; // Adjust this path as needed
import "./App.css"; // Keep your existing styles
import CoffeeShop from "./CoffeeShop/CoffeeShop.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/coffeeshop" replace />} />
          <Route path="coffeeShop" element={<CoffeeShop />} />
        </Routes>
        <AudioPlayer /> {/* Render the AudioPlayer component */}
      </div>
    </Router>
  );
}

export default App;
