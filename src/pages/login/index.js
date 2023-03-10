/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import StyleItem from '../../styles/style-item';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import './index.css';
import Loader from '../../components/loader';

import YoucastImage from '../../assets/logo-youcast.png';

const Login = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const ctoken = urlParams.get("ctoken");
    const bannerId = urlParams.get("advert");
    const companyName = urlParams.get("company");

    const [ userByBanner, setUserByBanner ] = React.useState(true);
    const [ userByWeb, setUserByWeb ] = React.useState(false);

    const [ vendorExists, setVendorExists ] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [errorState, setErrorState] = React.useState(false);
    const [sucessState, setSucessState] = React.useState(false);
    const [infoState, setInfoState] = React.useState(false);

    const handleCloseSelectVendor = () => {
        setVendorExists(true);
    };
    const handleOpenSelectVendor = () => {
        localStorage.clear();
        setVendorExists(false);
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    function handleSubmit(event) {
        event.preventDefault();
        login();
      }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const [paletteOptions, setPaletteOptions ] = useState([{
        primaryColor: '',
        secondaryColor: '',
        buttonColor: '',
        effectColor: '',
        vendorImg: '',
        vendorName: '',
        idCompany: ''
    }]);


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
        fetch('paletteOptions.json', {
            headers: {
                Accept: "application/json"
            }
        }).then(res => 
            res.json()
            ).then(resp => {
                let PaletteOptions = resp.paletteOptions;
                if(companyName == null ) {
                    setPaletteOptions(resp.paletteOptions);
                }else if(companyName !== null) {
                    setPaletteOptions(resp.paletteOptions.filter(e => e.vendorName === companyName))
                }

                if(ctoken == null || bannerId == null) {
                    setUserByBanner(false);
                    setUserByWeb(true);
                } else if(ctoken !== null || bannerId !== null) {
                    let token = ctoken;
                    let bannerid = parseInt(bannerId);
                    apis.post('login/auto', {
                        token,
                        bannerid
                    }).then(function (response) {
                        if(response.data.status === 1) {
                            let paletteProvedor = PaletteOptions.filter(e => e.idCompany === response.data.response.idcompany).map(e => e).reduce(e => e);
                            if(response.data.response.idcompany === paletteProvedor.idCompany) {
                                localStorage.setItem('primaryColor', paletteProvedor.primaryColor);
                                localStorage.setItem('secondaryColor', paletteProvedor.secondaryColor);
                                localStorage.setItem('buttonColor', paletteProvedor.buttonColor);
                                localStorage.setItem('effectColor', paletteProvedor.effectColor);
                                localStorage.setItem('vendorImg', paletteProvedor.vendorImg);
                                localStorage.setItem("token", response.data.response.token);
                                localStorage.setItem("profile", response.data.response.profileName);
                                window.location.href = '/dashboard';
                            }
                        } else {
                            window.location.href = '/';
                        }
                    }).catch(function (error) {
                        setError(error);
                        setErrorState(true);
                        window.location.href = '/'
                    })
                }
            }).catch((error) => {
                setError(error);
                window.location.href = '/'
            });

        const currentPrimaryColor = localStorage.getItem('primaryColor');
        const currentSecondaryColor = localStorage.getItem('secondaryColor');
        const currentButtonColor = localStorage.getItem('buttonColor');
        const currentEffectColor = localStorage.getItem('effectColor');
        const currentVendorImg = localStorage.getItem('vendorImg');

        setTheme(currentPrimaryColor, currentSecondaryColor, currentButtonColor, currentEffectColor, currentVendorImg);


        if(localStorage.getItem('primaryColor')) {
            setVendorExists(true);
        }

    }, [])

    const setTheme = (primaryColor, secondaryColor, buttonColor, effectColor, vendorImg) => {
        document.documentElement.style.setProperty('--bg-color-1', primaryColor);
        document.documentElement.style.setProperty('--bg-color-2', secondaryColor);
        document.documentElement.style.setProperty('--bg-button-color', buttonColor);
        document.documentElement.style.setProperty('--bg-effect-color', effectColor);
        document.documentElement.style.setProperty('--bg-vendor-image', vendorImg);

    }

    const setPalette = (event) => {
        const currentPrimaryColor = event.target.style.getPropertyValue('--bg-color-1');
        const currentSecondaryColor = event.target.style.getPropertyValue('--bg-color-2');
        const currentButtonColor = event.target.style.getPropertyValue('--bg-button-color');
        const currentEffectColor = event.target.style.getPropertyValue('--bg-effect-color');
        const currentVendorImg = event.target.style.getPropertyValue('--bg-vendor-image');

        setTheme(currentPrimaryColor, currentSecondaryColor, currentButtonColor, currentEffectColor, currentVendorImg);

        localStorage.setItem('primaryColor', currentPrimaryColor);
        localStorage.setItem('secondaryColor', currentSecondaryColor);
        localStorage.setItem('buttonColor', currentButtonColor);
        localStorage.setItem('effectColor', currentEffectColor);
        localStorage.setItem('vendorImg', currentVendorImg);



    }

    async function login() {
        let login = username;
        let idcompany = parseInt(localStorage.getItem('idCompany'));
        apis.post('login', {idcompany, login, password})
            .then(function (response) {
                if(response.data.status === 1) {
                    setInfoState(true);
                    setLoading(false);
                    localStorage.setItem("token", response.data.response.token);
                    localStorage.setItem("profile", response.data.response.profileName);
                    window.location.href = '/dashboard';
                    setSucessState(true);
                }
                if(response.data.status === 11) {
                    setError(response.data.response);
                    setLoading(false);
                    setErrorState(true);

                }
                if(response.data.status === 13) {
                    setError(response.data.response);
                    setLoading(false);
                    setErrorState(true);

                }
        }).catch(function (error) {
            setError(error);
            setErrorState(true);
            setLoading(false);
            window.location.href = '/';
          })

    }

    return(

        <div>

            <div className={`renderSelect ${userByWeb === true ? "active" : "inactive"}`}>
                {vendorExists === false
                    ?
                        <div className="configPage">
                            <div className="logoContent">
                                {/*<img src={YoucastImage} alt="Logo Youcast"/> */}
                            </div>

                            <div className="color-switcher">
                                <h1 className="heading">Selecione seu Provedor</h1>
                                <div className="color-list">
                                {paletteOptions.map((palette, idx) => 
                                    <div className="color-list-padding" key={idx} onClick={(() => {
                                        handleCloseSelectVendor();
                                        localStorage.setItem("idCompany", palette.idCompany);
                                        })}>
                                        <StyleItem 
                                                setPalette={setPalette} 
                                                primaryColor={palette.primaryColor}
                                                secondaryColor={palette.secondaryColor}
                                                buttonColor={palette.buttonColor}
                                                effectColor={palette.effectColor}
                                                vendorImg={palette.vendorImg}
                                                vendorName={palette.vendorName}
                                                idCompany={palette.idCompany}
                                        /> 
                                    </div>
                                )}
                                </div>
                            </div>
                        </div>
                    :
                        <div className="content">
                        <div className="content70 heightFull">
                            <div className="wave"></div>
                            <div className="wave"></div>
                            <div className="wave"></div>
                        </div>

                        <div className="content30">
                            <div className="content30Info">
                                <div className="contentLoginImg">
                                    <div className="vendorImage"></div>
                                </div>

                                <div className="InfoLogin"><h2>Voc?? est?? a um passo de ativar seu Produto Digital!</h2></div>
                            </div>

                            <div className="content30Login">                    
                                <div className="contentLogin mrgAuto">

                                    <div className="contentLoginReturn" >
                                        <button onClick={handleOpenSelectVendor}><ArrowBackIcon style={{ marginTop: 3}}/></button>
                                    </div>

                                    <div className="contentLoginHeader">  
                                        <h2>Entre com sua conta!</h2>
                                    </div>

                                    <div className="contentLoginInput">
                                        <form onSubmit={handleSubmit}>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '90%'}}>
                                                <div>
                                                    <TextField 
                                                        label="Username" 
                                                        id="outlined-size-normal" 
                                                        sx={{ m: 1, width: '41.5ch', }}
                                                        onChange={e => setUsername(e.target.value)}
                                                    />
                                                    
                                                    <FormControl sx={{ m: 1, width: '41.5ch' }} variant="outlined" >
                                                    <InputLabel htmlFor="outlined-adornment-password" >Password</InputLabel>
                                                    <OutlinedInput
                                                        id="outlined-adornment-password"
                                                        type={showPassword ? 'text' : 'password'}
                                                        onChange={e => setPassword(e.target.value)}
                                                        endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                            >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                        }
                                                        label="Password"
                                                    />
                                                    </FormControl>
                                                </div>
                                            </Box>


                                    <div className="contentLoginButton"> 
                                        <button type="submit" >Fazer Login</button>
                                    </div>


                                    <div className="contentLoginLine"></div>
                                        </form>
                                    </div>



                                </div>

                            </div>

                        </div>

                        <Box className='returnInfoButtons'>
                        <Collapse in={errorState}>
                            <Alert
                            severity="error"
                            action={
                                <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setErrorState(false);
                                }}
                                >
                                <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                            >
                            {error && <div className="error">{error}</div>}
                            </Alert>
                        </Collapse>
                        <Collapse in={infoState}>
                            <Alert
                            severity="warning"
                            action={
                                <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setInfoState(false);
                                }}
                                >
                                <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                            >
                            <p className="info">
                            Login sendo efetuado, aguarde um momento...
                            </p>
                            </Alert>
                        </Collapse>
                        <Collapse in={sucessState}>
                            <Alert
                            severity="success"
                            action={
                                <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setSucessState(false);
                                }}
                                >
                                <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                            >
                            <p className="success">
                            Login efetuado com sucesso! Voc?? j?? pode utilizar nosso portal
                            </p>
                            </Alert>
                        </Collapse>
                        </Box>
                        </div>
                }
            </div>

            <Loader userByBanner={userByBanner} />

        </div>
    );
}

export default Login;