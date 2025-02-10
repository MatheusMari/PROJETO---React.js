import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cabeca from './Cabeca';
import Footer from './Footer';
import Conteudo from './Conteudo';
import CategoryList from './CategoryList';
import RecipeList from './RecipeList';
import RecipeDetail from './RecipeDetail'; 
import Login from './Login'; 
function App() {
  return (
    <Router>
      <div className="App">
        <Cabeca />
        <Routes>
          <Route path="/" element={<Conteudo />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/recipes" element={<CategoryList />} />
          <Route path="/recipes/:category" element={<RecipeList />} /> 
          <Route path="/recipe/:id" element={<RecipeDetail />} /> 
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}





export default App;
