import {ToastError} from "../components/ToastError";
import axios from "axios";
import {optionsPost} from "../components/ApiOptions";

const login = async (credentials) => {
    return axios(optionsPost(credentials, "/api/user/login"))
        .then((res) => {
            localStorage.setItem("token", res.headers.authorization);
            localStorage.setItem('user', res.data)
            localStorage.setItem('role', res.data.role)
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
