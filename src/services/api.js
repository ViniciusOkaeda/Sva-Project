import axios from "axios";


const api = axios.create ({
    baseUrl: 'https://ativacao.youcast.tv.br/api/v1/internal/',
})


export default api;