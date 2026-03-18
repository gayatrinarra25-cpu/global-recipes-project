import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { mealService } from '../services/api';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import { ArrowLeft } from 'lucide-react';
import './SearchResults.css';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const navigate = useNavigate();
  
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const data = await mealService.searchMeals(query);
        setRecipes(data.meals || []);
      } catch (error) {
        console.error('Failed to search recipes:', error);
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    if (query !== null) {
      fetchResults();
    }
  }, [query]);

  return (
    <div className="search-results-page animate-fade-in">
      <div className="search-header-section">
        <div className="container">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} /> Back
          </button>
          
          <div className="search-box-container mt-md">
            <SearchBar initialQuery={query} />
          </div>
          
          <div className="results-summary mt-lg text-center">
            {loading ? (
              <h2>Searching for "{query}"...</h2>
            ) : (
              <h2>
                {recipes.length > 0 
                  ? `Found ${recipes.length} results for "${query}"` 
                  : `No results found for "${query}"`}
              </h2>
            )}
          </div>
        </div>
      </div>

      <div className="container mt-lg">
        {loading ? (
          <div className="loader-container">
            <div className="spinner"></div>
          </div>
        ) : recipes.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-md">
            {recipes.map(meal => (
              <RecipeCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        ) : (
          <div className="no-results-container flex-col items-center justify-center p-xl glass-panel">
            <div className="text-center">
              <h3>We couldn't find any matches.</h3>
              <p className="mt-sm mb-md text-text-light">
                Try searching for something else like "Chicken", "Beef", or "Pasta"
              </p>
              <button 
                className="btn btn-outline"
                onClick={() => navigate('/')}
              >
                Browse All Categories
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
