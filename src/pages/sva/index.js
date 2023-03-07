import React, { useEffect, useState } from 'react';import Menu from "../../components/menu";
import StyledCard2 from '../../components/cards/style2/styledCard2';
import './index.css';
import axios from 'axios';
import OptionsUser from '../../components/optionsUser';

const Sva = () => {

    const [ svaList, setSvaList] = useState ([{
        idsva: '',
        image: '',
        name: '',
        status: ''
    }])

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
                console.log("ATIVOS", result.data.response.filter(e => e.status === "ACTIVE").map(e => e).length);
                console.log("INATIVOS", result.data.response.filter(e => e.status === "INACTIVE").map(e => e).length);
            }).catch((error) => {
                console.log(error);
            })
        })();
    }, [])

    const setTheme = (primaryColor, secondaryColor, buttonColor, effectColor, vendorImg) => {
        document.documentElement.style.setProperty('--bg-color-1', primaryColor);
        document.documentElement.style.setProperty('--bg-color-2', secondaryColor);
        document.documentElement.style.setProperty('--bg-button-color', buttonColor);
        document.documentElement.style.setProperty('--bg-effect-color', effectColor);
        document.documentElement.style.setProperty('--bg-vendor-image', vendorImg);
    }

    return(
        <div className="Content2">
            <Menu />
            <div className="Container2">

                <div className="HeaderContent2">
                    <div className="HeaderMenu2"> 
                        <div className="HeaderMenuTitle2"><h2>Produtos Digitais</h2></div>
                        <div className="HeaderMenuOptions2"><OptionsUser /></div>

                    </div>
                </div>

                <div className="bodyContent2">
                    <div className="bodyContainer2">
                        <div className="bodyHeader2">
                            <h2>Ative seu Produto Digital!</h2>
                        </div>
                        <StyledCard2 svas={svaList}/>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Sva;