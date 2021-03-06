import {ToastError} from "../components/ToastError";
import axios from "axios";
import {optionsGet, optionsPost} from "../components/ApiOptions";

const getUser = async () => {
    return axios(optionsGet("/api/user/details"))
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error(error);
            ToastError("User was not found");
        });
};

const validateUser = async () => {
    return axios(optionsGet("/api/user/details"))
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error(error);
        });
};

const getUserById = async (id) => {
    return axios(optionsGet(`/api/user/${id}`))
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error(error);
            ToastError("User was not found");
        });
};

const addUser = async (userInfo) => {
    return axios(optionsPost(userInfo, "/api/user/register"))
        .then((res) => {
            return true;
        })
        .catch((error) => {
            console.error(error);
            ToastError("Register failed");
            return false;
        });
};

const editUser = async (userInfo) => {
    return axios(optionsPost(userInfo, "/api/user"))
        .then((res) => {
            return true;
        })
        .catch((error) => {
            console.error(error);
            ToastError("Editing failed");
            return false;
        });
};

export {getUser, addUser, editUser, getUserById, validateUser};
