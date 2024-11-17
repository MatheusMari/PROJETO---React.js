import React, { useState, useEffect } from 'react';
import './category.css';

const CategoryList = () => {
  const [categories, setCategories] = useState([]); // Inicializar como array vazio
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const [error, setError] = useState(null); // Estado para lidar com erros

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
            <img src={category.strCategoryThumb} alt={category.strCategory} />
            <h2>{category.strCategory}</h2>
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
