import axios from 'axios';
// import response from "./response";
// import {removeAccessToken} from "./session";

/**
 * Backend Connection configuration
 * Replace the below baseUrl with your local IP to connect to local backend server
 **/
const api = axios.create({
    baseURL: 'http://ec2-3-139-64-143.us-east-2.compute.amazonaws.com:8000/api/v1',
    timeout: 10000
});

// Set JSON Web Token in Client to be included in all calls
export const setClientToken = token => {
    api.interceptors.request.use(function(config) {
        config.headers.Authorization = token;
        return config;
    });
};

export default api;
//eyJ1c2VyX2F1dGhlbnRpY2F0aW9uX2lkIjoxNn0:1kiF8h:kI1qnO6Bq47bIE7HiTptDEp_coU
