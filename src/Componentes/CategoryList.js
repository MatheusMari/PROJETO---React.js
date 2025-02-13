import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importa o hook de navegação
import "../CSS/category.css";

const CategoryList = () => {
    const [categories, setCategories] = useState([]); // Inicializa como array vazio
    const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
    const [error, setError] = useState(null); // Estado para lidar com erros
    const navigate = useNavigate(); // Hook para navegação

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(
                    "https://www.themealdb.com/api/json/v1/1/categories.php"
                );
                const data = await response.json();
                setCategories(data.categories);
            } catch (err) {
                setError("Erro ao carregar as categorias.");
                console.error(err); // Exibe erro no console para depuração
            } finally {
                setLoading(false); // Desativa o carregamento após o fetch
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryClick = (categoryName) => {
        navigate(`/recipes/${categoryName}`); // Redireciona para a lista de receitas da categoria
    };

    if (loading) {
        return <p>Carregando categorias...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="category-list">
            <h2>Categorias de Receitas</h2>
            {categories.length > 0 ? (
                categories.map(({ idCategory, strCategory, strCategoryThumb, strCategoryDescription }) => (
                    <div key={idCategory} className="category-item">
                        <img
                            src={strCategoryThumb}
                            alt={strCategory}
                            className="clickable"
                            onClick={() => handleCategoryClick(strCategory)} // Corrige o click
                        />
                        <h2
                            className="clickable"
                            onClick={() => handleCategoryClick(strCategory)} // Corrige o click
                        >
                            {strCategory}
                        </h2>
                        <p>{strCategoryDescription}</p>
                    </div>
                ))
            ) : (
                <p>Nenhuma categoria encontrada.</p>
            )}
        </div>
    );
};

export default CategoryList;
