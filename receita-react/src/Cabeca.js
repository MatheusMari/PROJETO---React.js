import React from 'react';
import logos from './logo.png'
function Cabeca() {
    return (
        <header className="Cabeca">
            <div className="Cabeca-left">
                <h1>Recipe Haven</h1> <img src={logos} alt="Pizza" className="circle-image" />
            </div>
            
        </header>
    );
}

export default Cabeca;
