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

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/coffeeshop" replace />} />
          <Route path="coffeeShop" element={<CoffeeShop />} />
        </Routes>
        <AudioPlayer /> {/* This will render the AudioPlayer */}
      </div>
    </Router>
  );
}

export default App;
