import {ToastError} from "../components/ToastError";
import axios from "axios";
import {optionsPost} from "../components/ApiOptions";

const getAllUsers = async () => {
    return axios(optionsPost(null, "/api/users"))
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error(error);
            console.log(error)
            ToastError("User was not found");
        });
};


export {getAllUsers};
