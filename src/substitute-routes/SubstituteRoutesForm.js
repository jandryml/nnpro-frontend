import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {withRouter} from "react-router-dom";

import {
    deleteSubstituteRouteById,
    getSubstituteRouteById,
    saveSubstituteRoute
} from "../data-service/SubstituteRouteDataService";
import {ToastInfo} from "../components/ToastError";
import {getAllTrainRoutes} from "../data-service/TrainRouteDataService";

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

function SubstituteRoutesForm({isNew, match, history}) {

    const [trainRoutes, setRoutes] = useState([]);
    const [substituteRoutes, setSubstituteRoutes] = useState({
        id: -1,
        name: "",
        concernedTrainRoute: {
            id: 1
        }
    });

    useEffect(() => {
        getAllTrainRoutes().then((data) => {
            setRoutes(data)
        });

        !isNew && getSubstituteRouteById(match.params.id).then((data) => {
            setSubstituteRoutes(data);
        });
    }, [match.params.id]);

    const handleSubmit = () => {
        saveSubstituteRoute(substituteRoutes).then((res) => {
            if (res) {
                history.push("/substitute-route");
                ToastInfo("Substitute route successfully created");
            }
        });
    };

    const handleDelete = () => {
        deleteSubstituteRouteById(substituteRoutes.id).then((res) => {
            if (res) {
                history.push("/substitute-route");
                ToastInfo("Substitute route successfully removed");
            }
        });
    };

    const handleChange = event => {
        const {value, name} = event.target;
        setSubstituteRoutes({...substituteRoutes, [name]: value})
    }

    return (
        <div className="container">
            <h1>Substitute route detail</h1>
            <div>
                <TextField
                    required
                    id="substituteName"
                    margin="normal"
                    label="Substitute name"
                    name="name"
                    fullWidth={true}
                    value={substituteRoutes && substituteRoutes.name ? substituteRoutes.name : ''}
                    type="textField"
                    onChange={handleChange}
                />
                <div className="container-flex">
                    <FormControl fullWidth>
                        <InputLabel id="sourceStationLabel">Source station</InputLabel>
                        <Select
                            labelId="sourceStation"
                            id="sourceStation"
                            value={substituteRoutes.concernedTrainRoute.id}
                            label="Source station"
                            onChange={(event) => {
                                setSubstituteRoutes({...substituteRoutes, concernedTrainRoute: {id: event.target.value}});
                            }}
                        >
                            {trainRoutes &&
                            trainRoutes.length !== 0 &&
                            trainRoutes
                                .map((trainRoute) => (
                                    <MenuItem key={trainRoute.id}
                                              value={trainRoute.id}>{trainRoute.trainCode}</MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                </div>
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
                    onClick={() => history.push("/substitute-route")}
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

export default withRouter(SubstituteRoutesForm);
