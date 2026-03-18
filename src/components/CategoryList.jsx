import React from 'react';
import './CategoryList.css';

const CategoryList = ({ categories, selectedCategory, onSelectCategory }) => {
  if (!categories || categories.length === 0) return null;

  return (
    <div className="category-list-container">
      <div className="category-scroll flex gap-sm">
        <button
          className={`category-btn ${selectedCategory === '' ? 'active' : ''}`}
          onClick={() => onSelectCategory('')}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.idCategory}
            className={`category-btn ${selectedCategory === cat.strCategory ? 'active' : ''}`}
            onClick={() => onSelectCategory(cat.strCategory)}
          >
            {cat.strCategory}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
