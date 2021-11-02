import {ToastError} from "../components/ToastError";
import axios from "axios";
import {optionsDelete, optionsGet, optionsPost} from "../components/ApiOptions";

const getAllRails = async () => {
    return axios(optionsGet("/api/rail"))
        .then((res) => {
            if (res.data === "error") {
                return [];
            }
            return res.data;
        })
        .catch((error) => {
            console.error(error);
            ToastError("Problem with stations from server");
        });
};

const deleteRailById = async (id) => {
    return axios(optionsDelete(`/api/rail/${id}`))
        .then((res) => {
            return true;
        })
        .catch((error) => {
            console.error(error);
            ToastError("Problem with deleting rail from server");
            return false;
        });
};

const getRailById = async (id) => {
    return axios(optionsGet(`/api/rail/${id}`))
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error(error);
            ToastError("Problem with getting measurements from server");
            return false;
        });
};

const saveRail = async (rail) => {
    return axios(optionsPost(rail, "/api/rail"))
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error(error);
            ToastError("Rail save fail");
        });
};

export {
    getAllRails,
    deleteRailById,
    getRailById,
    saveRail,
};
