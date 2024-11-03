import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CoffeeShop from './CoffeeShop/CoffeeShop'; // Adjust the path as necessary
import MainMenu from './MainMenu/MainMenu';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/coffeeshop" element={<CoffeeShop />} />
      </Routes>
    </Router>
  );
}

export default App; 