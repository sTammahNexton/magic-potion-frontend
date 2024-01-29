import React from 'react';
import './App.css';
import Home from './views/Home';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Inventory from './views/Inventory';

function App() {
  return (
  <Router>
    <div>
     
    <nav className="bg-purple-900 text-white p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="hover:underline">Home</Link>
        </li>
        <li>
          <Link to="/inventory" className="hover:underline">Liste des ingrédients</Link>
        </li>
      </ul>
    </nav>

      <Routes>
        <Route path="/inventory" element={<Inventory />}/>
        <Route path="/" element={<Home />} />
      </Routes>
      
    </div>
  </Router>
  );
}

export default App;
