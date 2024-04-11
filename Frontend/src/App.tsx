import React from 'react';
import './App.css';
import Navbar from './Components/Navbar'; // Correction du nom du composant
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About"; // Ajout de l'import pour la page About


export default function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/"  element={<Home />} /> 
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}



