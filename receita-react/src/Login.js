import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Importa o arquivo de estilos

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulação de login (substituir por autenticação real)
    if (email === "admin@teste.com" && password === "1234") {
      alert("Login bem-sucedido!");
      navigate("/"); // Redireciona para a página inicial após o login
    } else {
      alert("Credenciais inválidas!");
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
      </form>
    </div>
  );
};

export default Login;
