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
import Park from "./Park/Park.js";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/coffeeshop" replace />} />
          <Route path="coffeeShop" element={<CoffeeShop />} />
          <Route path="park" element={<Park />} />
          <Route path='audioPlayer' element={<AudioPlayer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
