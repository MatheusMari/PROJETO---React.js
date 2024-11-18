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
        </div>
    );
}

export default Cabeca;