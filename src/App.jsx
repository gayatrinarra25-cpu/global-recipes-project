import React from 'react';
import { Routes, Route } from 'react-router-dom';

// We'll create these pages next
import Home from './pages/Home';
import RecipeDetails from './pages/RecipeDetails';
import SearchResults from './pages/SearchResults';

import { Utensils, ChefHat, Coffee, Pizza, Croissant } from 'lucide-react';

// And the components
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-wrapper">
      {/* Dynamic Background */}
      <div className="blob-bg">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        
        {/* Floating Cooking Elements */}
        <Utensils className="floating-element float-1" size={120} />
        <ChefHat className="floating-element float-2" size={150} />
        <Coffee className="floating-element float-3" size={100} />
        <Pizza className="floating-element float-4" size={140} />
        <Croissant className="floating-element float-5" size={110} />
      </div>

      <Header />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
