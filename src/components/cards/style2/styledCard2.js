import React, {useState, useRef, useEffect} from "react";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import api from "../../../services/api";
import './index.css'
import axios from 'axios';


const StyledCard2 = (svas) => {
    let modalOpenRef = useRef();
    const [ modalOpen, setModalOpen] = useState(false);
    const [ specificSva, setSpecificSva ] = useState({});
    console.log(parseInt(specificSva.idsva))

    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [errorState, setErrorState] = React.useState(false);
    const [sucessState, setSucessState] = React.useState(false);
    const [infoState, setInfoState] = React.useState(false);

const handleModal = () => {
        setModalOpen(!modalOpen);
    }


    useEffect(() => {

        let handler = e => {
            if(!modalOpenRef.current.contains(e.target)){
                setModalOpen(false);
            }
        };

        document.addEventListener("mousedown", handler);

        return() => {
            document.removeEventListener("mousedown", handler);
        }

    }, [])

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

    async function activeSva() {
        setInfoState(true);
        apis.patch('sva', {
                token: localStorage.getItem('token'),
                svaid: parseInt(specificSva.idsva),
                status: "ACTIVATE"
        }).then(function (response) {
            if(response.data.status === 1) {
                setInfoState(false);
                setSucessState(true);
                window.location.href = '/dashboard';
            }
        }).catch(function (error) {
            setError(error);
            setInfoState(false);
            setErrorState(true);
            setLoading(false);
        })

    }

    return(
        <div className="StyledContainer2">
            {svas.svas.filter(e => e.status === "INACTIVE").map((sva, idx) => {
                //console.log("meu svsadasdasa", sva)
                return(
                    <div key={idx} className="ContentStyled2">
                        <div className="ContainerStyled2">

                            <div className="ContainerStyledImage2">
                                <div className="StyledImage">
                                    <img src={sva.image} alt="SVA Image"/>
                                </div>
                            </div>

                            <div className="ContainerStyledHeader2">
                                <h2>{sva.name}</h2>
                                <button onClick={(() => {
                                    setSpecificSva(sva);
                                    handleModal();
                                })}>Habilitar SVA</button>
                            </div>

                        </div>



                    </div>
                );
            })}

            <div  className={`modalActiveSva ${modalOpen ? "active" : "inactive"}`}>
                <div ref={modalOpenRef} className="modalActiveSvaContainer">
                    <div className="modalActiveSvaContent1">
                        <h3>Deseja realmente ativar o SVA <span>{specificSva.name}</span>?</h3>
                    </div>

                    <div className="modalActiveSvaContent2">
                        <button onClick={() => {
                            handleModal();
                        }}>Cancelar</button>

                        <button onClick={activeSva}>Ativar</button>
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
                    SVA sendo ativado, aguarde um momento...
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
                    SVA ativado com sucesso! Você já pode utilizar o seu SVA.
                    </p>
                    </Alert>
                </Collapse>
            </Box>

        </div>

    );
}

export default StyledCard2;