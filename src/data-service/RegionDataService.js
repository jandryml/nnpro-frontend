import {ToastError} from "../components/ToastError";
import axios from "axios";
import {optionsGet} from "../components/ApiOptions";

const getRegions = async () => {
    return axios(optionsGet("/api/region"))
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error(error);
            ToastError("Regions not found");
        });
};

export {getRegions};
