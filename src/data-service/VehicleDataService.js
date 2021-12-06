import {ToastError} from "../components/ToastError";
import axios from "axios";
import {optionsDelete, optionsGet, optionsPost} from "../components/ApiOptions";

const getAllVehicles = async () => {
    return axios(optionsGet("/api/vehicle"))
        .then((res) => {
            if (res.data === "error") {
                return [];
            }
            return res.data;
        })
        .catch((error) => {
            console.error(error);
            ToastError("Problem with getting all vehicles from server");
        });
};

const deleteVehicleById = async (id) => {
    return axios(optionsDelete(`/api/vehicle/${id}`))
        .then(() => {
            return true;
        })
        .catch((error) => {
            console.error(error);
            ToastError("Problem with deleting vehicle, check for dependencies");
            return false;
        });
};

const getVehicleById = async (id) => {
    return axios(optionsGet(`/api/vehicle/${id}`))
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error(error);
            ToastError("Problem with getting vehicles from server");
            return false;
        });
};

const saveVehicle = async (trainRoute) => {
    return axios(optionsPost(trainRoute, "/api/vehicle"))
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error(error);
            ToastError("Vehicle save fail");
        });
};

export {
    getAllVehicles,
    deleteVehicleById,
    getVehicleById,
    saveVehicle,
};
