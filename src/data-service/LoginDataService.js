import {ToastError} from "../components/ToastError";
import axios from "axios";
import {optionsPost} from "../components/ApiOptions";

const login = async (credentials) => {
    return axios(optionsPost(credentials, "/api/user/login"))
        .then((res) => {
            localStorage.setItem("token", res.headers.authorization);
            console.log(res.headers.authorization);
        })
        .catch((error) => {
            console.error(error);
            ToastError("Credentials are not valid");
        });
};

const loginStatus = () => {
    return localStorage.getItem("token") != null;
};

const logout = () => {
    localStorage.clear();
};

export {login, logout, loginStatus};
