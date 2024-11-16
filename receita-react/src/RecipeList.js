import React, { useState, useEffect } from 'react';

const RecipeList = ({ categoryId }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch(`URL_DA_API/receitas?categoriaId=${categoryId}`);
      const data = await response.json();
      setRecipes(data.receitas);
    };

    fetchRecipes();
  }, [categoryId]);

  return (
    <div className="recipe-list">
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-item">
            <h3>{recipe.nome}</h3>
            <img src={recipe.imagem} alt={recipe.nome} />
            <p>{recipe.descricao}</p>
          </div>
        ))
      ) : (
        <p>Nenhuma receita encontrada.</p>
      )}
    </div>
  );
};

export default RecipeList;