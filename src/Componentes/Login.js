import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contextos/Autenticacao.js";
import "../CSS/Login.css"; // Importa o arquivo de estilos

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const resp = await login(email, password);
            if (resp && resp.status === 200) { // Verifica se a resposta existe e se o status é 200
                navigate("/"); // Redireciona para a Home após login bem-sucedido
            } else {
                setError(resp?.data?.message || "Usuário ou senha inválidos");
            }
        } catch (error) {
            console.log(error);
            setError("Erro ao conectar com o servidor");
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
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

                <button type="submit">Entrar</button>
                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Exibe a mensagem de erro */}
            </form>
        </div>
    );
};

export default Login;
