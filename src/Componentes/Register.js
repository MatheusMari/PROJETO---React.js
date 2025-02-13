import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contextos/Autenticacao.js";
import "../CSS/Login.css"; // Reutilizando o mesmo arquivo de estilos, você pode personalizar para registro também

const Register = () => {
    const [name, setName] = useState(""); // Para o nome
    const [email, setEmail] = useState(""); // Para o e-mail
    const [password, setPassword] = useState(""); // Para a senha
    const [confirmPassword, setConfirmPassword] = useState(""); // Para confirmar a senha
    const navigate = useNavigate();
    const { register, error } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validação simples
        if (password !== confirmPassword) {
            alert("As senhas não coincidem!");
            return;
        }

        // Simulação de registro (substituir por lógica real)
        if (email && password && name) {
            try {
                const response = await register(name, email, password);
                if (response.status < 400) {
                    navigate("/"); // Redireciona para a página inicial
                }
            } catch (err) {
                console.error("Erro ao registrar:", err);
                alert("Erro ao registrar, tente novamente!");
            }
        } else {
            alert("Por favor, preencha todos os campos!");
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Registrar-se</h2>

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

                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default Register;
