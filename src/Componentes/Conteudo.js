import React from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Conteudo.css";
import pizza from "../Pngs/Pizza.jpg";
import salgadas from "../Pngs/salgada.jpg";
import doces from "../Pngs/doce.jpg";
import veganas from "../Pngs/vegana.jpg";
import { Button } from "@mui/material";

function Conteudo() {
    const navigate = useNavigate(); // Hook para navegação

    const handleNavigate = () => {
        navigate("/recipes");
    };

    return (
        <div className="Contend-content">
            <div className="left-image">
                <img src={pizza} alt="Pizza" className="circle-image" />
            </div>
            <div className="right-content">
                <h2 style={{ fontFamily: '"Roboto", sans-serif' }}>
                    Venha conhecer e pesquisar receitas de todos os tipos!
                </h2>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNavigate}
                >
                    Clique Aqui
                </Button>

                <p>Escolha seu tipo de receita favorito!</p>

                <div className="recipe-types">
                    <div className="recipe-item">
                        <img
                            src={salgadas}
                            alt="Salgadas"
                            className="recipe-image"
                        />
                        <p>Salgadas</p>
                    </div>
                    <div className="recipe-item">
                        <img src={doces} alt="Doces" className="recipe-image" />
                        <p>Doces</p>
                    </div>
                    <div className="recipe-item">
                        <img
                            src={veganas}
                            alt="Veganas"
                            className="recipe-image"
                        />
                        <p>Veganas</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Conteudo;
