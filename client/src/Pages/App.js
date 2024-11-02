import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import './App.css';
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
