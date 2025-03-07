import axios from "axios";

const publicApi = axios.create({
    baseURL: "http://192.168.0.108:3001/api", // Altere para sua URL real
});

export default publicApi;
