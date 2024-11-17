import React from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import './Cabeca.css';

function Cabeca() {
    return (
        <div className="Cabeca">
            <div className="Cabeca-left">
                
                <h1>Recipe Haven</h1>
            </div>
            <div className="menu-icons">
                <MenuIcon />        
                <SettingsIcon />
            </div>
        </div>
    );
}

export default Cabeca;
