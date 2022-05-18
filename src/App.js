import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import './App.css';
import ArtistComponent from "./components/pages/artist";
import HomeComponent from "./components/pages/home";
import LoginComponent from "./components/pages/login";
import RegisterComponent from "./components/pages/register";
import SongComponent from "./components/pages/song";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<HomeComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/artist/:id" element={<ArtistComponent />} />
        <Route path="/song/:id" element={<SongComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
