import axios from "axios";

const axiosServices = axios.create({
  baseURL: "https://shaboshabo.wigal.com.gh/api",
    headers: {
        "Content-Type": "application/json",
        "Accept": "*/*",
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