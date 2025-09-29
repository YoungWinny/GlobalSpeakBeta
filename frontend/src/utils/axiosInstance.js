import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
})

export {axiosInstance};

// import axios from "axios";

// const axiosInstance = axios.create({
//     baseURL: "http://localhost:3000", // Your backend port
//     headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json"
//     }
// });

// // Add request interceptor for debugging
// axiosInstance.interceptors.request.use(
//   (config) => {
//     console.log(`Making ${config.method?.toUpperCase()} request to: ${config.baseURL}${config.url}`);
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Add response interceptor for debugging
// axiosInstance.interceptors.response.use(
//   (response) => {
//     console.log(`Response received: ${response.status} ${response.statusText}`);
//     return response;
//   },
//   (error) => {
//     console.error('API Error:', error.response?.status, error.response?.data);
//     return Promise.reject(error);
//   }
// );

// export { axiosInstance };









