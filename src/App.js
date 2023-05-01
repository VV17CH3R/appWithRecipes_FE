import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import { Home } from './pages/home';
import { Auth } from './pages/auth';
import { CreateRecipe } from './pages/create-recipe';
import { SavedRecipes } from './pages/saved-recipe';
import { Navbar } from "./components/navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <Routes>
            <Route path="/" element={<Home  />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/createrec" element={<CreateRecipe />} />
            <Route path="/savedrec" element={<SavedRecipes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
