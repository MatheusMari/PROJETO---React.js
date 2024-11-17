import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Conteudo.css';
import pizza from './Pizza.jpg'; // Substitua pelo caminho correto da imagem de pizza
import salgadas from './salgada.jpg';
import doces from './doce.jpg';
import veganas from './vegana.jpg';
import { Button } from '@mui/material';

function Conteudo() {
  const navigate = useNavigate(); // Hook para navegação

  const handleNavigate = () => {
    navigate('/recipes'); // Redireciona para a segunda tela
  };

  return (
    <div className="Contend-content">
      {/* Imagem circular à esquerda */}
      <div className="left-image">
        <img src={pizza} alt="Pizza" className="circle-image" />
      </div>
      {/* Conteúdo central */}
      <div className="right-content">
        <h2 style={{ fontFamily: '"Roboto", sans-serif' }}>
          Venha conhecer e pesquisar receitas de todos os tipos!
        </h2>
        <Button variant="contained" color="primary" onClick={handleNavigate}>
          Clique Aqui
        </Button>

        <p>Escolha seu tipo de receita favorito!</p>

        {/* Tipos de receita */}
        <div className="recipe-types">
          <div className="recipe-item">
            <img src={salgadas} alt="Salgadas" className="recipe-image" />
            <p>Salgadas</p>
          </div>
          <div className="recipe-item">
            <img src={doces} alt="Doces" className="recipe-image" />
            <p>Doces</p>
          </div>
          <div className="recipe-item">
            <img src={veganas} alt="Veganas" className="recipe-image" />
            <p>Veganas</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Conteudo;
