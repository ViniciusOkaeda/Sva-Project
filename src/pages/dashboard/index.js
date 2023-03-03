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

    const [ activeS, setActiveS ] = useState(null);
    const [ inactiveS, setInactiveS ] = useState(null);
    //var activeSvas = svaList.filter(e => e.status === "ACTIVE").map(e => e.status = 1);
    //let SvaActivated = activeSvas;
    console.log("ativohfthdhs", svaList.map(e => e).reduce(e => e))






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
                setSvaList(result.data.response)
                setActiveS(result.data.response.filter(e => e.status === "ACTIVE").map(e => e).length);
                setInactiveS(result.data.response.filter(e => e.status === "INACTIVE").map(e => e).length);
            }).catch((error) => {
                console.log(error);
            })
        })();

        //console.log("o sva", svaList);
    
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
                    <div className="bodyContainer">

                        <div className="bodyCardContent">
                            <div className="bodyCard">
                                <div className="cardTopContent "> 
                                    <h5 className="cardTopContentColor1">Ativos</h5>
                                </div>

                                <div className="cardBottomContent">
                                    <h4>Meus SVA's</h4>
                                    <h2>Você tem {activeS} SVA's</h2>
                                </div>
                            </div>

                            <div className="bodyCard">
                                <div className="cardTopContent "> 
                                    <h5 className="cardTopContentColor2">Para Ativar</h5>
                                </div>

                                <div className="cardBottomContent">
                                    <h4>Disponíveis</h4>
                                    <h2>Existem {inactiveS} SVA's</h2>
                                </div>
                            </div>

                        </div>

                        <div className="bodyTableContent">
                        <StyledCard1 svas={svaList}/>

                        </div>

                        
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Dashboard;