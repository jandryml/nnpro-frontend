import ToastMe from "../components/ToastMe";
import axios from "axios";
import {optionsDelete, optionsGet, optionsPost} from "../components/ApiOptions";

const getAllMeasurements = async () => {
    return axios(optionsGet("/api/measurement"))
        .then((res) => {
            if (res.data === "error") {
                return [];
            }
            return res.data;
        })
        .catch((error) => {
            console.error(error);
            ToastMe("Problem with getting data from server");
        });
};

const deleteMeasurementById = async (id) => {
    return axios(optionsDelete(`/api/measurement/${id}`))
        .then((res) => {
            return true;
        })
        .catch((error) => {
            console.error(error);
            ToastMe("Problem with deleting measurements from server");
            return false;
        });
};

const getIntervalMeasurements = async (interval) => {
    return axios(optionsPost(interval, "/api/measurement/interval"))
        .then((res) => {
            if (res.data === "error") {
                return [];
            }
            return res.data;
        })
        .catch((error) => {
            console.error(error);
            ToastMe("Problem with getting data from server");
        });
};

const addMeasurements = async (measurements) => {
    return axios(optionsPost(measurements, "/api/measurement"))
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error(error);
            ToastMe("Incidents save fail");
        });
};

export {
    getAllMeasurements,
    getIntervalMeasurements,
    addMeasurements,
    deleteMeasurementById,
};
