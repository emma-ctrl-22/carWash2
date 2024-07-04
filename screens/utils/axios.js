import axios from "axios";
import { API_KEY } from "@env";

const ApiKey = API_KEY;

const axiosServices = axios.create({
  baseURL: "https://shaboshabo.wigal.com.gh/api",
    headers: {
        "Content-Type": "application/json",
        "Accept": "*/*",
        'X-API-KEY': ApiKey
    },
});

axiosServices.interceptors.request.use(
    (config) => {
        console.log("Request:", config);
        return config;
    },
    (error) => {
        console.error("Request error:", error);
        return Promise.reject(error);
    }
    );
export default axiosServices;

// axiosServices.interceptors.response.use(
//     (response) => {
//         console.log("Response:", response);
//         return response;
//     },
//     (error) => {
//         console.error("Response error:", error);
//         return Promise.reject(error);
//     }
//     );