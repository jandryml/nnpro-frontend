import {ToastError} from "../components/ToastError";
import axios from "axios";
import {optionsDelete, optionsGet, optionsPost} from "../components/ApiOptions";

const getAllTransportCompanies = async () => {
    return axios(optionsGet("/api/transport-company"))
        .then((res) => {
            if (res.data === "error") {
                return [];
            }
            return res.data;
        })
        .catch((error) => {
            console.error(error);
            ToastError("Problem with getting all transport companies from server");
        });
};

const deleteTransportCompanyById = async (id) => {
    return axios(optionsDelete(`/api/transport-company/${id}`))
        .then(() => {
            return true;
        })
        .catch((error) => {
            console.error(error);
            ToastError("Problem with deleting transport company, check for dependencies");
            return false;
        });
};

const getTransportCompanyById = async (id) => {
    return axios(optionsGet(`/api/transport-company/${id}`))
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error(error);
            ToastError("Problem with getting transport company from server");
            return false;
        });
};

const saveTransportCompany = async (trainRoute) => {
    return axios(optionsPost(trainRoute, "/api/transport-company"))
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error(error);
            ToastError("Transport company save fail");
        });
};

export {
    getAllTransportCompanies,
    deleteTransportCompanyById,
    getTransportCompanyById,
    saveTransportCompany,
};
