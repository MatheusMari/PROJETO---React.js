import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importação dos componentes
import Cabeca from "./Componentes/Cabeca";
import Footer from "./Componentes/Footer";
import Conteudo from "./Componentes/Conteudo";
import CategoryList from "./Componentes/CategoryList";
import RecipeList from "./Componentes/RecipeList";
import RecipeDetail from "./Componentes/RecipeDetail";
import Login from "./Componentes/Login";
import Register from "./Componentes/Register";
import Favoritos from "./Componentes/Favoritos";

function App() {
    return (
        <Router>
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
        </Router>
    );
}

export default App;
