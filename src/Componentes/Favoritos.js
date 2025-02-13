import React, { useEffect, useState } from "react";
import { listarFavoritos, removerFavorito } from "../Backend/Servidor.js";
import Comentario from "./Comentario.js";
// import "../CSS/Favoritos.css";

const Favoritos = () => {
    const [favoritos, setFavoritos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFavoritos = async () => {
            try {
                const response = await listarFavoritos();
                setFavoritos(response);
            } catch (err) {
                setError("Erro ao carregar os favoritos.");
            } finally {
                setLoading(false);
            }
        };

        fetchFavoritos();
    }, []);

    const handleDesfavoritar = async (itemName) => {
        try {
            const a = await removerFavorito(itemName);
            console.log(a);
            setFavoritos(favoritos.filter(favorito => favorito.item !== itemName));
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <p>Carregando favoritos...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="favoritos-list">
            <h2>Meus Favoritos</h2>
            {favoritos.length > 0 ? (
                favoritos.map((favorito) => (
                    <div key={favorito._id} className="favorito-item">
                        <h3>{favorito.item}</h3>
                        <button onClick={() => handleDesfavoritar(favorito.item)}>Remover</button>
                        <Comentario key={favorito._id} favoritoId={favorito._id} comentarios={favorito.comentarios} />
                    </div>
                ))
            ) : (
                <p>Você não tem favoritos ainda.</p>
            )}
        </div>
    );
};

export default Favoritos;