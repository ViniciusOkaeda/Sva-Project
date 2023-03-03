import React from 'react'
import './index.css';

const StyleItem = ({primaryColor, setPalette, secondaryColor, buttonColor, effectColor, vendorImg, vendorName}) => 
<div  
    className="color-item" 
    style={{
        '--bg-color-1': primaryColor,
        '--bg-color-2': secondaryColor,
        '--bg-button-color': buttonColor,
        '--bg-effect-color': effectColor,
        '--bg-vendor-image': vendorImg,
        }}>
    <div  className="color-item-container">
        <div className="color-item-image">
            <div className="color-item-image-content"> </div>
        </div>

        <div  className="color-item-content">
            <h2>{vendorName}</h2>
            <button 
                style={{
                    '--bg-color-1': primaryColor,
                    '--bg-color-2': secondaryColor,
                    '--bg-button-color': buttonColor,
                    '--bg-effect-color': effectColor,
                    '--bg-vendor-image': vendorImg}} 
                onClick={setPalette}
            >Selecionar Provedor</button>
        </div>
    </div>

</div>

export default StyleItem;
