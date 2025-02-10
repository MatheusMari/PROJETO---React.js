import React from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import './Cabeca.css';

function Cabeca() {
    return (




        <div className="Cabeca">
            <div className="Cabeca-left">
                <h1 onClick={() => window.location.href = '/'}>
                    Recipe Haven 
                </h1>
                
            </div>

            <div class="box-busca">
        <div class="search-box">
            
            <form method="post" action="#">
                <input type="text" className="search-box-input" placeholder="Buscar" />
                <button class="search-box-button"><i class="search-box-icone icon icon-search"></i></button>
            
            </form>
            
        </div>
    
    </div>
    <div class="botoesaction">
    <button class="custom-button">Login</button>
    <button class="custom-button">Registrar-se</button>
</div>

        </div>
        
    );
}

export default Cabeca;