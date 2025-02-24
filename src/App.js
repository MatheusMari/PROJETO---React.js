import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importação dos componentes
import Cabeca from "./Componentes/Cabeca.js";
import Footer from "./Componentes/Footer.js";
import Conteudo from "./Componentes/Conteudo.js";
import CategoryList from "./Componentes/CategoryList.js";
import RecipeList from "./Componentes/RecipeList.js";
import RecipeDetail from "./Componentes/RecipeDetail.js";
import Login from "./Componentes/Login.js";
import Register from "./Componentes/Register.js";
import Favoritos from "./Componentes/Favoritos.js";

// Importando o AuthProvider
import { AuthProvider } from "./Contextos/Autenticacao.js";

function App() {
      console.log("App renderizado"); // Verificar se o App está sendo renderizado corretamente

    return (
        <Router>
            <AuthProvider> {/* Envolva a aplicação com o AuthProvider */}
                <div className="App">
                    {/* Cabeçalho e conteúdo principal */}
                    <Cabeca />
                    <main>
                        <Routes>
                            <Route path="/" element={<Conteudo />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/recipes" element={<CategoryList />} />
                            <Route path="/recipes/:category" element={<RecipeList />} />
                            <Route path="/recipe/:id" element={<RecipeDetail />} />
                            <Route path="/favoritos" element={<Favoritos />} />
                        </Routes>
                    </main>
                    {/* Rodapé */}
                    <Footer />
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
