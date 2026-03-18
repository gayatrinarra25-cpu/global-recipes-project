import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import './SearchBar.css';

const SearchBar = ({ initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form className="hero-search-form" onSubmit={handleSubmit}>
      <Search className="hero-search-icon" size={24} />
      <input
        type="text"
        className="hero-search-input"
        placeholder="Try 'Arrabiata', 'Chicken', or 'Sushi'..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="hero-search-btn btn-primary">
        Search Recipes
      </button>
    </form>
  );
};

export default SearchBar;
