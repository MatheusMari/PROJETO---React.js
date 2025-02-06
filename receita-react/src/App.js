import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cabeca from './Cabeca';
import Footer from './Footer';
import Conteudo from './Conteudo';
import CategoryList from './CategoryList';
import RecipeList from './RecipeList';
import RecipeDetail from './RecipeDetail'; 
import connectDB from '../database/database.js';
function App() {
  return (
    <Router>
      <div className="App">
        <Cabeca />
        <Routes>
          <Route path="/" element={<Conteudo />} />
          <Route path="/recipes" element={<CategoryList />} />
          <Route path="/recipes/:category" element={<RecipeList />} /> 
          <Route path="/recipe/:id" element={<RecipeDetail />} /> 
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}



const app = express();
const PORT = 3000;

// Conectar ao MongoDB antes de iniciar o servidor
connectDB();

app.get('/', (req, res) => {
    res.send("API conectada ao MongoDB!");
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${3000}`);
});

export default App;
