import {ToastError} from "../components/ToastError";
import axios from "axios";
import {optionsDelete, optionsGet, optionsPost} from "../components/ApiOptions";

const getAllSubstituteRoutes = async () => {
    return axios(optionsGet("/api/substitute-route"))
        .then((res) => {
            if (res.data === "error") {
                return [];
            }
            return res.data;
        })
        .catch((error) => {
            console.error(error);
            ToastError("Problem with getting all substitute routes from server");
        });
};

const deleteSubstituteRouteById = async (id) => {
    return axios(optionsDelete(`/api/substitute-route/${id}`))
        .then((res) => {
            return true;
        })
        .catch((error) => {
            console.error(error);
            ToastError("Problem with deleting substitute route, check for dependencies");
            return false;
        });
};

const getSubstituteRouteById = async (id) => {
    return axios(optionsGet(`/api/substitute-route/${id}`))
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error(error);
            ToastError("Problem with getting substitute route from server");
            return false;
        });
};

const saveSubstituteRoute = async (substituteRoute) => {
    return axios(optionsPost(substituteRoute, "/api/substitute-route"));
};

export {
    getAllSubstituteRoutes,
    deleteSubstituteRouteById,
    getSubstituteRouteById,
    saveSubstituteRoute,
};
