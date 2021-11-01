import ToastMe from "../components/ToastMe";
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
            ToastMe("Problem with getting all stations from server");
        });
};

const deleteStationById = async (id) => {
    return axios(optionsDelete(`/api/station/${id}`))
        .then((res) => {
            return true;
        })
        .catch((error) => {
            console.error(error);
            ToastMe("Problem with deleting measurements from server");
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
            ToastMe("Problem with getting station from server");
            return false;
        });
};

const addStation = async (station) => {
    return axios(optionsPost(station, "/api/station"))
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error(error);
            ToastMe("Station save fail");
        });
};

export {
    getAllStations,
    deleteStationById,
    getStationById,
    addStation,
};
