import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../CSS/RecipeDetail.css";
import { adicionarFavorito, listarFavoritos, removerFavorito } from "../Backend/Servidor.js";

const RecipeDetail = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [favoritado, setFavoritado] = useState(false);
    const [favoritos, setFavoritos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFavoritos = async (recipeName) => {
            try {
                const response = await listarFavoritos();
                setFavoritos(response);
                if (response.some((item) => item.item === recipeName)) {
                    setFavoritado(true);
                }
            } catch (error) {
                console.error(error);
            }
        };

        const fetchRecipeDetail = async () => {
            try {
                const response = await axios.get(
                    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
                );
                const recipeData = response.data.meals[0];
                setRecipe(recipeData);
                fetchFavoritos(recipeData.strMeal);
            } catch (err) {
                setError("Erro ao carregar os detalhes da receita.");
            } finally {
                setLoading(false);
            }
        };

        fetchRecipeDetail();
    }, [id]);

    const handleFavoritar = async (itemName) => {
        try {
            const response = await adicionarFavorito(itemName);
            setFavoritado(true);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    const handleDesfavoritar = async (itemName) => {
        try {
            const response = await removerFavorito(itemName);
            setFavoritado(false);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    if (loading) return <p>Carregando detalhes...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="recipe-detail">
            <div style={{ display: "flex", width: '100%', justifyContent: "space-between", alignItems: "center", position: 'relative' }}>
                <h1 style={{ justifySelf: 'center' }}>{recipe.strMeal}</h1>
                {favoritado ?
                    (<button onClick={() => handleDesfavoritar(recipe.strMeal)} style={{ position: 'absolute', right: 0, top: 0 }}>Desfavoritar</button>)
                    :
                    (<button onClick={() => handleFavoritar(recipe.strMeal)} style={{ position: 'absolute', right: 0, top: 0 }}>Favoritar</button>)
                }
            </div>
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
