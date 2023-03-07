import React from 'react'
import './index.css';

const StyleItem = ({
    primaryColor, 
    setPalette, 
    secondaryColor, 
    buttonColor, 
    effectColor, 
    vendorImg, 
    vendorName, 
    idCompany}) => 
        <div className="color-item">
            <div className="color-item-container">
                <div className="color-item-image">
                    <div style={{
                            '--bg-color-1': primaryColor,
                            '--bg-color-2': secondaryColor,
                            '--bg-button-color': buttonColor,
                            '--bg-effect-color': effectColor,
                            '--bg-vendor-image': vendorImg,
                        }}
                        className="color-item-image-content" 
                        onClick={setPalette}></div>
                </div>
            </div>
        </div>


export default StyleItem;
