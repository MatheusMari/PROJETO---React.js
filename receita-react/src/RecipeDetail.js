import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './RecipeDetail.css';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        setRecipe(response.data.meals[0]);
      } catch (err) {
        setError('Erro ao carregar os detalhes da receita.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetail();
  }, [id]);

  if (loading) return <p>Carregando detalhes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="recipe-detail">
      <h1>{recipe.strMeal}</h1>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <h2>Instruções</h2>
      <p>{recipe.strInstructions}</p>
      <h3>Ingredientes</h3>
      <ul>
        {Array.from({ length: 20 }, (_, i) => ({
          ingredient: recipe[`strIngredient${i + 1}`],
          measure: recipe[`strMeasure${i + 1}`],
        }))
          .filter((item) => item.ingredient && item.ingredient.trim())
          .map((item, index) => (
            <li key={index}>
              {item.ingredient} - {item.measure}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default RecipeDetail;
