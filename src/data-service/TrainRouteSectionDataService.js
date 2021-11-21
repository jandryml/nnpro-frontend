import {ToastError} from "../components/ToastError";
import axios from "axios";
import {optionsDelete, optionsGet, optionsPost} from "../components/ApiOptions";

const getAllTrainRouteSection = async () => {
    return axios(optionsGet("/api/train-route-section"))
        .then((res) => {
            if (res.data === "error") {
                return [];
            }
            return res.data;
        })
        .catch((error) => {
            console.error(error);
            ToastError("Problem with getting all train route sections from server");
        });
};

const deleteTrainRouteSectionById = async (id) => {
    return axios(optionsDelete(`/api/train-route-section/${id}`))
        .then((res) => {
            return true;
        })
        .catch((error) => {
            console.error(error);
            ToastError("Problem with deleting train route section, check for dependencies");
            return false;
        });
};

const getTrainRouteSectionById = async (id) => {
    return axios(optionsGet(`/api/train-route-section/${id}`))
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error(error);
            ToastError("Problem with getting train route section from server");
            return false;
        });
};

const saveTrainRouteSection = async (trainRouteSection) => {
    return axios(optionsPost(trainRouteSection, "/api/train-route-section"))
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error(error);
            ToastError("Train route section save fail");
        });
};

export {
    getAllTrainRouteSection,
    deleteTrainRouteSectionById,
    getTrainRouteSectionById,
    saveTrainRouteSection,
};
