import ToastMe from "../components/ToastMe";
import axios from "axios";
import {optionsDelete, optionsGet, optionsPost} from "../components/ApiOptions";

const getAllIncidents = async () => {
    return axios(optionsGet("/api/incident"))
        .then((res) => {
            if (res.data === "error") {
                return [];
            }
            return res.data;
        })
        .catch((error) => {
            console.error(error);
            ToastMe("Problem with getting incidents from server");
        });
};

const deleteIncidentById = async (id) => {
    return axios(optionsDelete(`/api/incident/${id}`))
        .then((res) => {
            return true;
        })
        .catch((error) => {
            console.error(error);
            ToastMe("Problem with deleting incident from server");
            return false;
        });
};

const getIncidentById = async (id) => {
    return axios(optionsGet(`/api/incident/${id}`))
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error(error);
            ToastMe("Problem with getting incident from server");
            return false;
        });
};

const addIncident = async (incident) => {
    return axios(optionsPost(incident, "/api/incident"))
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error(error);
            ToastMe("Incident save fail");
        });
};

export {
    getAllIncidents,
    deleteIncidentById,
    getIncidentById,
    addIncident,
};
