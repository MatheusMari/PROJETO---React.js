import React, { useState, useEffect } from "react";
import CategoryList from "./CategoryList.js";
import "../CSS/styles.css";

const Meio = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para controle de carregamento
    const [error, setError] = useState(null); // Estado para controle de erro

    // Fetch dos dados da API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("URL_DA_API");
                if (!response.ok) {
                    throw new Error("Erro ao buscar categorias");
                }
                const data = await response.json();
                if (data.categorias) {
                    setCategories(data.categorias);
                } else {
                    setError("Categorias não encontradas.");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return <p>Carregando categorias...</p>;
    }

    if (error) {
        return <p>Erro: {error}</p>;
    }

    return (
        <div className="container">
            <h1>Receitas por Categoria</h1>
            <CategoryList categories={categories} />
        </div>
    );
};

export default Meio;
