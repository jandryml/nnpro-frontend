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
import {ToastError, ToastInfo} from "../components/ToastError";
import {getAllTrainRoutes} from "../data-service/TrainRouteDataService";
import {SectionList} from "../components/SectionList";

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
        trainRouteId: -1,
        validated: false,
        minimalCapacity: 0,
        sections: []
    });

    const [substituteRouteSection, setSubstituteRouteSection] = useState([]);

    useEffect(() => {
        getAllTrainRoutes().then((data) => {
            setRoutes(data)
        });

        !isNew && getSubstituteRouteById(match.params.id).then((data) => {
            setSubstituteRoutes(data);
            setSubstituteRouteSection(data.sections)
        });
    }, [match.params.id]);

    const handleSubmit = () => {
        saveSubstituteRoute({...substituteRoutes, sections: substituteRouteSection}).then((res) => {
            if (res) {
                history.push("/substitute-route");
                ToastInfo("Substitute route successfully created");
            }
        }).catch((error) => {
            console.log(error.response.data.message);
            ToastError(error.response.data.message);
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
                        disabled
                        labelId="sourceStation"
                        id="sourceStation"
                        value={substituteRoutes.trainRouteId}
                        label="Source station"
                        onChange={(event) => {
                            setSubstituteRoutes({...substituteRoutes, trainRouteId: event.target.value});
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
            <TextField
                disabled
                id="validated"
                margin="normal"
                label="Validated"
                name="validated"
                fullWidth={true}
                value={substituteRoutes && substituteRoutes.validated ? 'True' : 'False'}
                type="textField"
                onChange={handleChange}
            />
            <TextField
                disabled
                id="minimalCapacity"
                margin="normal"
                label="Needed capacity"
                name="minimalCapacity"
                fullWidth={true}
                value={substituteRoutes && substituteRoutes.minimalCapacity ? substituteRoutes.minimalCapacity : 0}
                type="textField"
                onChange={handleChange}
            />

            {<SectionList routeNode={substituteRouteSection} setRouteNode={setSubstituteRouteSection}/>}

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
