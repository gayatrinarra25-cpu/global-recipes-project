import React, { useState, useEffect } from 'react';
import { mealService } from '../services/api';
import SearchBar from '../components/SearchBar';
import CategoryList from '../components/CategoryList';
import RecipeCard from '../components/RecipeCard';
import './Home.css';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [randomMeal, setRandomMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initial Data Fetch
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const [categoriesData, randomData] = await Promise.all([
          mealService.getCategories(),
          mealService.getRandomMeal()
        ]);
        // Custom sorting to keep "Beef" at the very end
        const rawCategories = categoriesData.categories || [];
        const beefCategory = rawCategories.find(cat => cat.strCategory.toLowerCase() === 'beef');
        const otherCategories = rawCategories.filter(cat => cat.strCategory.toLowerCase() !== 'beef');
        
        if (beefCategory) {
          setCategories([...otherCategories, beefCategory]);
        } else {
          setCategories(rawCategories);
        }
        
        setRandomMeal(randomData.meals[0]);
        
        // Fetch initially popular meals (since "search by letter" isn't fully comprehensive, we can just fetch Arrabiata or chicken as base)
        const initialMeals = await mealService.searchMeals('');
        if (initialMeals.meals) {
          // Shuffle and take 10 random ones for the home page (2 rows of 5)
          const shuffled = initialMeals.meals.sort(() => 0.5 - Math.random());
          setRecipes(shuffled.slice(0, 10));
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchInitialData();
  }, []);

  // Fetch meals when category changes
  useEffect(() => {
    const fetchMealsByCategory = async () => {
      if (!selectedCategory) return;
      
      setLoading(true);
      try {
        const data = await mealService.getMealsByCategory(selectedCategory);
        // We only get basic info from filter.php (id, name, thumb). 
        // For a full app we might lookup each, but for grid, this is fine
        // We map them to match our RecipeCard interface
        setRecipes((data.meals || []).slice(0, 15));
      } catch (error) {
        console.error('Failed to fetch category meals:', error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedCategory) {
      fetchMealsByCategory();
    } else if (!loading && categories.length > 0) {
      // If we go back to "All", just fetch some random ones by empty search again
      mealService.searchMeals('').then(data => {
        if (data.meals) setRecipes(data.meals.slice(0, 10));
      });
    }
  }, [selectedCategory]);

  return (
    <div className="home-page animate-fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container text-center">
          <h1 className="hero-title">
            Discover <span className="text-gradient">World-Class</span> Recipes
          </h1>
          <p className="hero-subtitle">
            Explore thousands of delicious recipes from across the globe, right at your fingertips.
          </p>
          <SearchBar />
        </div>
      </section>

      {/* Featured Random Meal */}
      {randomMeal && !selectedCategory && (
        <section className="featured-section container">
          <div className="section-header">
            <h2>Featured Recipe</h2>
            <div className="header-line"></div>
          </div>
          <div className="featured-card glass-panel group">
            <div className="featured-image">
              <img src={randomMeal.strMealThumb} alt={randomMeal.strMeal} />
            </div>
            <div className="featured-content">
              <span className="category-tag">{randomMeal.strCategory}</span>
              <h3 className="mt-sm">{randomMeal.strMeal}</h3>
              <p className="featured-desc mt-sm">
                {randomMeal.strInstructions.substring(0, 180)}...
              </p>
              <div className="mt-md">
                <a href={`/recipe/${randomMeal.idMeal}`} className="btn btn-primary">
                  View Full Recipe
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Categories & Recipe Grid */}
      <section className="recipes-section container">
        <div className="section-header flex justify-between items-center">
          <h2>{selectedCategory ? `${selectedCategory} Recipes` : 'Explore Recipes'}</h2>
        </div>

        <div className="categories-wrapper">
          <CategoryList 
            categories={categories} 
            selectedCategory={selectedCategory} 
            onSelectCategory={setSelectedCategory} 
          />
        </div>

        {loading ? (
          <div className="loader-container">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-lg gap-md">
            {recipes.map(meal => (
              <RecipeCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
