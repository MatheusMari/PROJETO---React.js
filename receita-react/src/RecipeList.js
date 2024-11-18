import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipesByCategory } from '../src/redux/recipeSlice'; // Ação para buscar receitas por categoria
import { useParams, useNavigate } from 'react-router-dom';
import './RecipeList.css'; 

const RecipeList = () => {
  const { category } = useParams(); // Obtém o parâmetro de categoria da URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Obtém o estado das receitas no Redux
  const { recipes, loading, error } = useSelector((state) => state.recipes);

  useEffect(() => {
    if (category) {
      // Despacha a ação para buscar receitas da categoria
      dispatch(fetchRecipesByCategory(category));
    }
  }, [dispatch, category]);

  // Função para navegar para a tela de detalhes da receita
  const handleRecipeClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`); // Redireciona para a tela de detalhes da receita
  };

  if (loading) return <p>Carregando receitas...</p>;
  if (error) return <p>Erro ao carregar receitas: {error}</p>;

  return (
    <div className="recipe-list">
      <h2>Receitas de {category}</h2>
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
        <p>Nenhuma receita encontrada para a categoria {category}.</p>
      )}
    </div>
  );
};

export default RecipeList;
