import React from 'react';
import Cabeca from './Cabeca';
import Conteudo from './Conteudo';
import Footer from './Footer';
import './App.css';

function App() {
    return (
        <div className="App">
            <Cabeca />
            <Conteudo />
            <Footer />
        </div>
    );
}

export default App;
