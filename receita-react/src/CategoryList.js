import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook de navegação
import './category.css';

const CategoryList = () => {
  const [categories, setCategories] = useState([]); // Inicializar como array vazio
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const [error, setError] = useState(null); // Estado para lidar com erros
  const navigate = useNavigate(); // Hook para navegação

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const data = await response.json();
        setCategories(data.categories); // Certifique-se de que "categories" é o caminho correto na resposta
      } catch (err) {
        setError('Erro ao carregar as categorias.');
      } finally {
        setLoading(false); // Desativa o carregamento após o fetch
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/recipes/${category}`); // Redireciona para a lista de receitas da categoria
  };

  if (loading) {
    return <p>Carregando categorias...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="category-list">
      {categories.length > 0 ? (
        categories.map((category) => (
          <div key={category.idCategory} className="category-item">
            {/* Torna a imagem clicável */}
            <img
              src={category.strCategoryThumb}
              alt={category.strCategory}
              className="clickable"
              onClick={() => handleCategoryClick(category.strCategory)}
            />
            {/* Torna o título clicável */}
            <h2
              className="clickable"
              onClick={() => handleCategoryClick(category.strCategory)}
            >
              {category.strCategory}
            </h2>
            {/* Descrição permanece visível */}
            <p>{category.strCategoryDescription}</p>
          </div>
        ))
      ) : (
        <p>Nenhuma categoria encontrada.</p>
      )}
    </div>
  );
};

export default CategoryList;
