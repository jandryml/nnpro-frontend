import {ToastError} from "../components/ToastError";
import axios from "axios";
import {optionsDelete, optionsGet, optionsPost} from "../components/ApiOptions";

const getAllTrainRoutes = async () => {
    return axios(optionsGet("/api/train-route"))
        .then((res) => {
            if (res.data === "error") {
                return [];
            }
            return res.data;
        })
        .catch((error) => {
            console.error(error);
            ToastError("Problem with getting all train routes from server");
        });
};

const deleteTrainRouteById = async (id) => {
    return axios(optionsDelete(`/api/train-route/${id}`))
        .then((res) => {
            return true;
        })
        .catch((error) => {
            console.error(error);
            ToastError("Problem with deleting train route, check for dependencies");
            return false;
        });
};

const getTrainRouteById = async (id) => {
    return axios(optionsGet(`/api/train-route/${id}`))
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error(error);
            ToastError("Problem with getting train route from server");
            return false;
        });
};

const saveTrainRoute = async (trainRoute) => {
    return axios(optionsPost(trainRoute, "/api/train-route"))
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error(error);
            ToastError("Train route save fail");
        });
};

export {
    getAllTrainRoutes,
    deleteTrainRouteById,
    getTrainRouteById,
    saveTrainRoute,
};
