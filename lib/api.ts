import axios from "axios";

const publicApi = axios.create({
    baseURL: "https://api.ritterveiculos.com.br/api", // Altere para sua URL real
});

export default publicApi;
