import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipesByCategory } from '../src/redux/recipeSlice'; // Criaremos o slice abaixo
import { useParams, useNavigate } from 'react-router-dom';
import './RecipeList.css'; // Estilize conforme necessário

const RecipeList = () => {
  const { category } = useParams(); // Obtém a categoria da URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { recipes, loading, error } = useSelector((state) => state.recipes);

  useEffect(() => {
    if (category) {
      dispatch(fetchRecipesByCategory(category));
    }
  }, [dispatch, category]);

  const handleRecipeClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  if (loading) return <p>Carregando receitas...</p>;
  if (error) return <p>Erro ao carregar receitas: {error}</p>;

  return (
    <div className="recipe-list">
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <div
            key={recipe.idMeal}
            className="recipe-item"
            onClick={() => handleRecipeClick(recipe.idMeal)}
          >
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <h3>{recipe.strMeal}</h3>
          </div>
        ))
      ) : (
        <p>Nenhuma receita encontrada para esta categoria.</p>
      )}
    </div>
  );
};

export default RecipeList;
