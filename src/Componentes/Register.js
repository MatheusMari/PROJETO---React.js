import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contextos/Autenticacao.js";
import "../CSS/Login.css";

const Register = () => {
    const [name, setName] = useState(""); 
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [confirmPassword, setConfirmPassword] = useState(""); 
    const [errorMessage, setErrorMessage] = useState(""); // Estado para erros
    const navigate = useNavigate();
    const { register } = useAuth(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(""); // Reseta o erro antes de enviar
    
        if (password !== confirmPassword) {
            setErrorMessage("As senhas não coincidem!");
            return;
        }
    
        if (!name || !email || !password) {
            setErrorMessage("Por favor, preencha todos os campos!");
            return;
        }
    
        try {
            const response = await register(name, email, password);
    
            if (response.status < 400) {
                navigate("/"); // Redireciona para a página inicial
            } else {
                setErrorMessage(response.data?.message || "Erro ao registrar, tente novamente!");
            }
        } catch (err) {
            console.error("Erro ao registrar:", err);
    
            if (err.response) {
                if (err.response.status === 409) {
                    const confirmar = window.confirm("Usuário já existe! Deseja fazer login?");
                    if (confirmar) {
                        navigate("/login");
                    }
                } else if (err.response.data?.errors) {
                    // Captura erros do express-validator
                    setErrorMessage(err.response.data.errors.map(err => err.msg).join(" | "));
                } else {
                    setErrorMessage(err.response.data?.message || "Erro ao registrar, tente novamente!");
                }
            } else {
                setErrorMessage("Erro ao conectar-se ao servidor. Tente novamente mais tarde.");
            }
        }
    };
    

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Registrar-se</h2>

                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <label>Nome:</label>
                <input
                    type="text"
                    placeholder="Digite seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label>Email:</label>
                <input
                    type="email"
                    placeholder="Digite seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label>Senha:</label>
                <input
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <label>Confirmar Senha:</label>
                <input
                    type="password"
                    placeholder="Confirme sua senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default Register;
