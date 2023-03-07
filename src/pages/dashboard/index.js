/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Menu from '../../components/menu';
import OptionsUser from '../../components/optionsUser';
import './index.css';
import axios from 'axios';
import StyledCard1 from '../../components/cards/style1/styledCard1';

const Dashboard = () => {

    const [ svaList, setSvaList] = useState ([{
        idsva: '',
        image: '',
        name: '',
        status: ''
    }])

    const [ havingSva, setHavingSva ] = useState(false);

    const [ activeS, setActiveS ] = useState(null);
    const [ inactiveS, setInactiveS ] = useState(null);

    const apis = axios.create({
        baseURL: 'https://ativacao.youcast.tv.br/api/v1/internal/',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, PATCH, OPTIONS"
        }
    })

    useEffect(() => {
        const currentPrimaryColor = localStorage.getItem('primaryColor');
        const currentSecondaryColor = localStorage.getItem('secondaryColor');
        const currentButtonColor = localStorage.getItem('buttonColor');
        const currentEffectColor = localStorage.getItem('effectColor');
        const currentVendorImg = localStorage.getItem('vendorImg');

        setTheme(currentPrimaryColor, currentSecondaryColor, currentButtonColor, currentEffectColor, currentVendorImg);

        let token = localStorage.getItem('token');

        (async () => {
            const result = await apis.get('sva', {
                params: {
                    token: token
                }
            }).then((result) => {
                if(result.data.response.length === 0) {
                    setHavingSva(false);
                    
                    console.log("deu zero", havingSva);
                }else if (result.data.response.length > 0) {
                    setHavingSva(true);
                    console.log("deu um");
                    setSvaList(result.data.response)
                    setActiveS(result.data.response.filter(e => e.status === "ACTIVE").map(e => e).length);
                    setInactiveS(result.data.response.filter(e => e.status === "INACTIVE").map(e => e).length);
                }
            }).catch((error) => {
                console.log(error);
            })
        })();

    
    },[]);

    const setTheme = (primaryColor, secondaryColor, buttonColor, effectColor, vendorImg) => {
        document.documentElement.style.setProperty('--bg-color-1', primaryColor);
        document.documentElement.style.setProperty('--bg-color-2', secondaryColor);
        document.documentElement.style.setProperty('--bg-button-color', buttonColor);
        document.documentElement.style.setProperty('--bg-effect-color', effectColor);
        document.documentElement.style.setProperty('--bg-vendor-image', vendorImg);

    }




    return(
        <div className="Content">
            <Menu />
            <div className="Container">

                <div className="HeaderContent">
                    <div className="HeaderMenu"> 
                        <div className="HeaderMenuTitle"><h2>Dashboard</h2></div>
                        <div className="HeaderMenuOptions"><OptionsUser /></div>

                    </div>
                </div>

                <div className="bodyContent">
                    <div className={`having ${havingSva === true ? 'activeHaving' : 'inactiveHaving'}`}>
                        <div className="bodyContainer">
                            
                            <div className="bodyCardContent">
                                <div className="bodyCard">
                                    <div className="cardTopContent "> 
                                        <h5 className="cardTopContentColor1">Ativos</h5>
                                    </div>

                                    <div className="cardBottomContent">
                                        <h4>Meus Produtos Digitais</h4>
                                        <h2>Você tem {activeS} Produtos</h2>
                                    </div>
                                </div>

                                <div className="bodyCard">
                                    <div className="cardTopContent "> 
                                        <h5 className="cardTopContentColor2">Para Ativar</h5>
                                    </div>

                                    <div className="cardBottomContent">
                                        <h4>Disponíveis</h4>
                                        <h2>Existem {inactiveS} Produtos</h2>
                                    </div>
                                </div>

                            </div>

                            <div className="bodyTableContent">
                            <StyledCard1 svas={svaList}/>
                            </div>

                            
                        </div>

                    </div>

                    <div className={`having ${havingSva === false ? 'activeNotHaving' : 'inactiveNotHaving'}`}>
                        <div className="bodyCardMessage">
                            <h2>Você não tem direito à nenhum produto digital. Entre em contato com seu provedor!</h2>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Dashboard;