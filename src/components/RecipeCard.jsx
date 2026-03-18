import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Globe, ArrowRight } from 'lucide-react';
import './RecipeCard.css';

const RecipeCard = ({ meal }) => {
  if (!meal) return null;

  return (
    <Link to={`/recipe/${meal.idMeal}`} className="recipe-card glass-panel group">
      <div className="card-image-wrapper">
        <img 
          src={meal.strMealThumb} 
          alt={meal.strMeal} 
          className="card-image group-hover-scale"
          loading="lazy"
        />
        <div className="card-overlay">
          <span className="view-recipe-btn">
            View Recipe <ArrowRight size={16} />
          </span>
        </div>
      </div>
      
      <div className="card-content">
        <div className="card-meta flex justify-between items-center">
          <span className="category-tag">{meal.strCategory || 'Delicious'}</span>
          {meal.strArea && (
            <span className="area-info flex items-center gap-xs tooltip" title="Origin">
              <Globe size={14} />
              {meal.strArea}
            </span>
          )}
        </div>
        
        <h3 className="card-title mt-xs">{meal.strMeal}</h3>
        
        {/* If we have tags, show the first two */}
        {meal.strTags && (
          <div className="tags-container flex gap-xs mt-sm flex-wrap">
            {meal.strTags.split(',').slice(0, 2).map((tag, index) => (
              <span key={index} className="recipe-tag">#{tag.trim()}</span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

export default RecipeCard;
