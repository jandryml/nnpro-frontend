import {ToastError} from "../components/ToastError";
import axios from "axios";
import {optionsDelete, optionsGet, optionsPost} from "../components/ApiOptions";

const getAllChauffeurs = async () => {
    return axios(optionsGet("/api/chauffeur"))
        .then((res) => {
            if (res.data === "error") {
                return [];
            }
            return res.data;
        })
        .catch((error) => {
            console.error(error);
            ToastError("Problem with getting all chauffeurs from server");
        });
};

const deleteChauffeurRouteById = async (id) => {
    return axios(optionsDelete(`/api/chauffeur/${id}`))
        .then(() => {
            return true;
        })
        .catch((error) => {
            console.error(error);
            ToastError("Problem with deleting chauffeur, check for dependencies");
            return false;
        });
};

const getChauffeurById = async (id) => {
    return axios(optionsGet(`/api/chauffeur/${id}`))
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error(error);
            ToastError("Problem with getting chauffeur from server");
            return false;
        });
};

const saveChauffeur = async (trainRoute) => {
    return axios(optionsPost(trainRoute, "/api/chauffeur"))
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error(error);
            ToastError("Chauffeur save fail");
        });
};

export {
    getAllChauffeurs,
    deleteChauffeurRouteById,
    getChauffeurById,
    saveChauffeur,
};
