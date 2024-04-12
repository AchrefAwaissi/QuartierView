import React from 'react';
import './App.css';
import Navbar from './Components/Navbar'; // Correction du nom du composant
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ListeAnnonce from './Pages/ListeAnnonce';
import PostAnnonce from './Pages/PostAnnonce';
import GoogleMaps from './Components/LocationAPI';



export default function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/"  element={<Home />} /> 
          <Route path="/ListeAnnonce" element={<ListeAnnonce />} />
          <Route path="/PostAnnonce" element={<PostAnnonce />} />
        </Routes>
      </Router>
    </div>
  );
}

