import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://peaceful-beach-86981.herokuapp.com/api/"
})