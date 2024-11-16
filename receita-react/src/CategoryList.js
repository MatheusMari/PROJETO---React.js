import React, { useState } from 'react';
import RecipeList from './RecipeList';
import './category.css';

const CategoryList = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  return (
    <div className="category-list">
      {categories.map((category) => (
        <div key={category.idCategoria} className="category-item">
          <img src={category.strCategoryThumb} alt={category.strCategory} />
          <h2 onClick={() => handleCategoryClick(category)}>{category.strCategory}</h2>
          <p>{category.strCategoryDescription}</p>
          {selectedCategory === category && <RecipeList categoryId={category.idCategoria} />}
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
