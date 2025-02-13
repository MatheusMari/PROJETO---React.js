import React from "react";
import { useNavigate } from "react-router-dom"; 
import { useAuth } from "../Contextos/Autenticacao.js";
import "../CSS/Cabeca.css";

function Cabeca() {
    const navigate = useNavigate();
    const { user, logout } = useAuth(); 

    // Função para redirecionar para páginas
    const handleNavigation = (path) => {
        navigate(path);
    };

    // Função para prevenir comportamento padrão do formulário de busca
    const handleSearchSubmit = (event) => {
        event.preventDefault();
        // Aqui você pode implementar a lógica de busca
        console.log("Busca realizada!");
    };

    return (
        <div className="Cabeca">
            <div className="Cabeca-left">
                <h1 onClick={() => handleNavigation("/")}>
                    Recipe Haven
                </h1>
            </div>

            <div className="box-busca">
                <div className="search-box">
                    <form method="post" action="#" onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            className="search-box-input"
                            placeholder="Buscar"
                        />
                        <button className="search-box-button" type="submit">
                            <i className="search-box-icone icon icon-search"></i>
                        </button>
                    </form>
                </div>
            </div>

            <div className="botoesaction">
                {user ? (
                    <>
                        <button className="custom-button" onClick={() => handleNavigation("/favoritos")}>
                            Favoritos
                        </button>
                        <button className="custom-button" onClick={logout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <button className="custom-button" onClick={() => handleNavigation("/login")}>
                            Login
                        </button>
                        <button className="custom-button" onClick={() => handleNavigation("/register")}>
                            Registrar-se
                        </button>
                    </>
                )}
                <button className="custom-button" onClick={() => handleNavigation("/")}>
                    Voltar ao Início
                </button>
            </div>
        </div>
    );
}

export default Cabeca;
