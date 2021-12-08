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

const listAvailableByCompanyIds = async (companyIds) => {
    return axios.get('http://localhost:8080/api/vehicle/available-vehicles', {
        'params': {'companyIds': companyIds},
        'paramsSerializer': params => parseParams(params)
    }).then((res) => {
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

const parseParams = (params) => {
    const keys = Object.keys(params);
    let options = '';

    keys.forEach((key) => {
        const isParamTypeObject = typeof params[key] === 'object';
        const isParamTypeArray = isParamTypeObject && (params[key].length >= 0);

        if (!isParamTypeObject) {
            options += `${key}=${params[key]}&`;
        }

        if (isParamTypeObject && isParamTypeArray) {
            params[key].forEach((element) => {
                options += `${key}=${element}&`;
            });
        }
    });

    return options ? options.slice(0, -1) : options;
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
    listAvailableByCompanyIds
};
