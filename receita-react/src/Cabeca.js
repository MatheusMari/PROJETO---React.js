import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importando o hook useNavigate
import SettingsIcon from '@mui/icons-material/Settings';
import './Cabeca.css';

function Cabeca() {
  const navigate = useNavigate(); // Criando o hook de navegação

  // Função para redirecionar para a página de login
  const handleLoginClick = () => {
    navigate('/login');
  };
  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="Cabeca">
      <div className="Cabeca-left">
        <h1 onClick={() => window.location.href = '/login'}>
          Recipe Haven
        </h1>
      </div>

      <div className="box-busca">
        <div className="search-box">
          <form method="post" action="#">
            <input type="text" className="search-box-input" placeholder="Buscar" />
            <button className="search-box-button"><i className="search-box-icone icon icon-search"></i></button>
          </form>
        </div>
      </div>

      <div className="botoesaction">
        <button className="custom-button" onClick={handleLoginClick}>Login</button>
        <button className="custom-button" onClick={handleRegisterClick}>Registrar-se</button>
      </div>
    </div>
  );
}

export default Cabeca;
