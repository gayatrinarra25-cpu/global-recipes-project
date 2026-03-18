import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChefHat, Search, Menu, X } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsMenuOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="header glass-panel">
      <div className="container header-container">
        <Link to="/" className="logo flex items-center gap-xs">
          <ChefHat size={32} className="logo-icon" />
          <span className="logo-text text-gradient">GlobalBites</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          <Link to="/" className="nav-link">Home</Link>
          <form onSubmit={handleSearchSubmit} className="search-form">
            <input 
              type="text" 
              placeholder="Search recipes..." 
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-btn">
              <Search size={18} />
            </button>
          </form>
        </nav>

        {/* Mobile menu toggle */}
        <button 
          className="mobile-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="mobile-nav animate-fade-in">
          <div className="container flex-col gap-sm p-md">
            <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <form onSubmit={handleSearchSubmit} className="mobile-search-form">
              <input 
                type="text" 
                placeholder="Search recipes..." 
                className="search-input full-width"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="search-btn">
                <Search size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
