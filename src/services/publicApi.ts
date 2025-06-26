import axios from "axios";

const publicApi = axios.create({
    baseURL: "http://168.231.96.194:3000/api", // Altere para sua URL real
});

export default publicApi;
