import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
// import AudioPlayer from "/Users/mattwhy/Documents/Academics/GitHub/Bhacks2024Table19/client/src/Audio/AudioPlayer.css"; 
import "./App.css";

import CoffeeShop from './CoffeeShop/CoffeeShop.js';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Navigate to="/coffeeshop" replace />} />
          <Route path='coffeeShop' element={<CoffeeShop />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
