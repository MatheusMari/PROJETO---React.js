import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cabeca from './Cabeca';
import Conteudo from './Conteudo';
import Footer from './Footer';
import CategoryList from './CategoryList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Cabeca />
        <Routes>
          {/* Rota para a página inicial */}
          <Route path="/" element={<Conteudo />} />
          {/* Rota para a segunda tela (categorias) */}
          <Route path="/recipes" element={<CategoryList />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
