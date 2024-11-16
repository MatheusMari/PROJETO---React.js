import React, { useState, useEffect } from 'react';
import CategoryList from './CategoryList';
import './styles.css';

const Meio = () => {
  const [categories, setCategories] = useState([]);

  // Fetch dos dados da API
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('URL_DA_API');
      const data = await response.json();
      setCategories(data.categorias);
    };

    fetchCategories();
  }, []);

  return (
    <div className="container">
      <h1>Receitas por Categoria</h1>
      <CategoryList categories={categories} />
    </div>
  );
};

export default Meio;
