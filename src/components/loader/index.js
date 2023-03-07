import React from 'react';
import './index.css';


const Loader = (userByBanner) => {
    return(
        <div className={`renderLoading ${userByBanner === false ? "active" : "inactive"}`}>
            <div className="loaderContent">
                <div className="loader"></div>
                <div className="loaderHeader"><h2>Aguarde enquanto você é redirecionado...</h2></div>
            </div>
        </div>
    );

}

export default Loader;