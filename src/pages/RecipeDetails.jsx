import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mealService } from '../services/api';
import { ArrowLeft, Clock, Users, Flame, Globe, Youtube } from 'lucide-react';
import './RecipeDetails.css';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const data = await mealService.getMealById(id);
        if (data.meals && data.meals.length > 0) {
          setRecipe(data.meals[0]);
        } else {
          setError('Recipe not found');
        }
      } catch (err) {
        setError('Failed to load recipe details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipe();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="container text-center mt-xl">
        <h2>{error || 'Recipe not found'}</h2>
        <button className="btn btn-primary mt-md" onClick={() => navigate('/')}>
          <ArrowLeft size={18} /> Back to Home
        </button>
      </div>
    );
  }

  // Extract ingredients and measures
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    
    if (ingredient && ingredient.trim() !== '') {
      ingredients.push({ ingredient, measure });
    }
  }

  // Format Instructions
  const formattedInstructions = recipe.strInstructions
    .split(/\r\n|\n/)
    .map(step => step.trim())
    .filter(step => step !== '' && !/^step\s*\d+[:.]?\s*$/i.test(step));

  // Extract YouTube ID
  let youtubeId = null;
  if (recipe.strYoutube) {
    const urlParams = new URLSearchParams(new URL(recipe.strYoutube).search);
    youtubeId = urlParams.get('v');
  }

  return (
    <div className="recipe-details-page animate-fade-in">
      <div className="container">
        <button className="back-btn mt-md" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> Back
        </button>

        <div className="recipe-hero mt-sm">
          <div className="recipe-hero-image-wrapper glass-panel">
            <img 
              src={recipe.strMealThumb} 
              alt={recipe.strMeal} 
              className="recipe-hero-image"
            />
          </div>
          
          <div className="recipe-hero-content">
            <div className="recipe-tags flex gap-sm">
              <span className="category-tag">{recipe.strCategory}</span>
              <span className="area-info flex items-center gap-xs">
                <Globe size={16} /> {recipe.strArea}
              </span>
            </div>
            
            <h1 className="recipe-title mt-sm">{recipe.strMeal}</h1>
            
            <div className="recipe-meta grid grid-cols-3 gap-sm mt-md">
              <div className="meta-item glass-panel flex-col items-center p-sm">
                <Clock className="meta-icon" size={24} />
                <span className="meta-value">45</span>
                <span className="meta-label">Mins</span>
              </div>
              <div className="meta-item glass-panel flex-col items-center p-sm">
                <Users className="meta-icon" size={24} />
                <span className="meta-value">4</span>
                <span className="meta-label">Servings</span>
              </div>
              <div className="meta-item glass-panel flex-col items-center p-sm">
                <Flame className="meta-icon" size={24} />
                <span className="meta-value">320</span>
                <span className="meta-label">Cals</span>
              </div>
            </div>

            {recipe.strTags && (
              <div className="tags-container flex gap-xs mt-md flex-wrap">
                {recipe.strTags.split(',').map((tag, index) => (
                  <span key={index} className="recipe-tag">#{tag.trim()}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="recipe-content grid lg:grid-cols-3 gap-lg mt-xl">
          <div className="ingredients-section lg:col-span-1">
            <div className="glass-panel p-md sticky-container">
              <h2>Ingredients</h2>
              <ul className="ingredients-list mt-md">
                {ingredients.map((item, index) => (
                  <li key={index} className="ingredient-item flex justify-between">
                    <span className="ingredient-name">{item.ingredient}</span>
                    <span className="ingredient-measure">{item.measure}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="instructions-section lg:col-span-2">
            <h2>Instructions</h2>
            <div className="instructions-list mt-md">
              {formattedInstructions.map((step, index) => (
                <div key={index} className="instruction-step flex gap-md">
                  <div className="step-number">{index + 1}</div>
                  <p className="step-text">{step}</p>
                </div>
              ))}
            </div>

            {recipe.strYoutube && (
               <div className="video-section mt-xl">
                 <h2 className="flex items-center gap-sm">
                   <Youtube color="#ff0000" size={28} /> Video Tutorial
                 </h2>
                 <div className="video-container glass-panel mt-md">
                   {youtubeId ? (
                     <iframe 
                        width="100%" 
                        height="100%" 
                        src={`https://www.youtube.com/embed/${youtubeId}`} 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen>
                     </iframe>
                   ) : (
                     <a href={recipe.strYoutube} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                       Watch on YouTube
                     </a>
                   )}
                 </div>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
