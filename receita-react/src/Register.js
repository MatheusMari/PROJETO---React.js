import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Reutilizando o mesmo arquivo de estilos, você pode personalizar para registro também

const Register = () => {
  const [name, setName] = useState(""); // Para o nome
  const [email, setEmail] = useState(""); // Para o e-mail
  const [password, setPassword] = useState(""); // Para a senha
  const [confirmPassword, setConfirmPassword] = useState(""); // Para confirmar a senha
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação simples
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    // Simulação de registro (substituir por lógica real)
    if (email && password && name) {
      alert("Registro bem-sucedido!");
      navigate("/login"); // Redireciona para a página de login após o registro
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
      </form>
    </div>
  );
};

export default Register;
