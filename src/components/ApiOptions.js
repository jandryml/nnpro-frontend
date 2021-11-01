import axios from "axios";

//const apiUrl = "https://nnpro-backend.herokuapp.com";
//const apiUrl = "https://personal-statistics-server.herokuapp.com"
const apiUrl = "http://localhost:8080";

axios.interceptors.request.use(
    (config) => {
        const {origin} = new URL(config.url);
        const allowedOrigins = [apiUrl];
        const token = localStorage.getItem("token");
        if (allowedOrigins.includes(origin)) {
            config.headers.authorization = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const optionsPost = (object, api) => {
    return {
        url: `${apiUrl}${api}`,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        data: object,
    };
};


const optionsDelete = (api) => {
    return {
        url: `${apiUrl}${api}`,
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    };
};


const optionsGet = (api) => {
    return {
        url: `${apiUrl}${api}`,
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };
};

export {optionsPost, optionsGet, optionsDelete}
