import {ToastError} from "../components/ToastError";
import axios from "axios";
import {optionsDelete, optionsGet, optionsPost} from "../components/ApiOptions";

const getAllStations = async () => {
    return axios(optionsGet("/api/station"))
        .then((res) => {
            if (res.data === "error") {
                return [];
            }
            return res.data;
        })
        .catch((error) => {
            console.error(error);
            ToastError("Problem with getting all stations from server");
        });
};

const deleteStationById = async (id) => {
    return axios(optionsDelete(`/api/station/${id}`))
        .then((res) => {
            return true;
        })
        .catch((error) => {
            console.error(error);
            ToastError("Problem with deleting station, check for dependencies");
            return false;
        });
};

const getStationById = async (id) => {
    return axios(optionsGet(`/api/station/${id}`))
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error(error);
            ToastError("Problem with getting station from server");
            return false;
        });
};

const saveStation = async (station) => {
    return axios(optionsPost(station, "/api/station"))
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error(error);
            ToastError("Station save fail");
        });
};

export {
    getAllStations,
    deleteStationById,
    getStationById,
    saveStation,
};
