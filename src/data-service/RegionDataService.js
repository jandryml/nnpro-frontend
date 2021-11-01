import ToastMe from "../components/ToastMe";
import axios from "axios";
import {optionsGet} from "../components/ApiOptions";

const getRegions = async () => {
    return axios(optionsGet("/api/region"))
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error(error);
            ToastMe("Regions not found");
        });
};

export {getRegions};
