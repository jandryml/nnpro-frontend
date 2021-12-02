import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {withRouter} from "react-router-dom";

import {
    deleteTransportCompanyById,
    getTransportCompanyById,
    saveTransportCompany
} from "../data-service/TransportCompanyDataService";
import {ToastInfo} from "../components/ToastError";

makeStyles((theme) => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 100,
    },
}));

function TransportCompaniesForm({isNew, match, history}) {

    const [transportCompanies, setTransportCompanies] = useState({
        id: -1,
        code: "",
        name: "",
        cin: ""
    });

    useEffect(() => {
        !isNew && getTransportCompanyById(match.params.id).then((data) => {
            setTransportCompanies(data);
        });
    }, [match.params.id]);

    const handleSubmit = () => {
        saveTransportCompany(transportCompanies).then((res) => {
            if (res) {
                history.push("/transport-company");
                ToastInfo("Transport company successfully created");
            }
        });
    };

    const handleDelete = () => {
        deleteTransportCompanyById(transportCompanies.id).then((res) => {
            if (res) {
                history.push("/transport-company");
                ToastInfo("Transport company successfully removed");
            }
        });
    };

    const handleChange = event => {
        const {value, name} = event.target;
        setTransportCompanies({...transportCompanies, [name]: value})
    }

    return (
        <div className="container">
            <h1>Transport company detail</h1>
            <div>
                <TextField
                    required
                    id="code"
                    margin="normal"
                    label="Code"
                    name="code"
                    fullWidth={true}
                    value={transportCompanies && transportCompanies.code ? transportCompanies.code : ''}
                    type="textField"
                    onChange={handleChange}
                />
                <TextField
                    required
                    id="name"
                    margin="normal"
                    label="Name"
                    name="name"
                    fullWidth={true}
                    value={transportCompanies && transportCompanies.name ? transportCompanies.name : ''}
                    type="textField"
                    onChange={handleChange}
                />
                <TextField
                    required
                    id="cin"
                    margin="normal"
                    label="Company identification number (CIN)"
                    name="cin"
                    fullWidth={true}
                    value={transportCompanies && transportCompanies.cin ? transportCompanies.cin : ''}
                    type="textField"
                    onChange={handleChange}
                />
            </div>
            <div className="container-flex">
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth={true}
                    onClick={handleSubmit}
                >
                    Save
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    fullWidth={true}
                    onClick={() => history.push("/transport-company")}
                >Back</Button>
                {!isNew && <Button
                    type="submit"
                    variant="contained"
                    color="default"
                    fullWidth={true}
                    onClick={handleDelete}
                >
                    Delete
                </Button>}
            </div>
        </div>
    );
}

export default withRouter(TransportCompaniesForm);
