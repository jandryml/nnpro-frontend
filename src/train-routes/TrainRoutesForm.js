import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {withRouter} from "react-router-dom";

import {deleteTrainRouteById, getTrainRouteById, saveTrainRoute} from "../data-service/TrainRouteDataService";
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

function TrainRoutesForm({isNew, match, history}) {

    const [trainRoutes, setTrainRoutes] = useState({
        id: -1,
        trainCode: "",
        closure: true
    });

    useEffect(() => {
        !isNew && getTrainRouteById(match.params.id).then((data) => {
            setTrainRoutes(data);
        });
    }, [match.params.id]);

    const handleSubmit = () => {
        saveTrainRoute(trainRoutes).then((res) => {
            if (res) {
                history.push("/train-route");
                ToastInfo("Train route successfully created");
            }
        });
    };

    const handleDelete = () => {
        deleteTrainRouteById(trainRoutes.id).then((res) => {
            if (res) {
                history.push("/train-route");
                ToastInfo("Train route successfully removed");
            }
        });
    };

    const handleChange = event => {
        const {value, name} = event.target;
        setTrainRoutes({...trainRoutes, [name]: value})
    }

    return (
        <div className="container">
            <h1>Train route detail</h1>
            <div>
                <TextField
                    required
                    id="trainCode"
                    margin="normal"
                    label="Train code"
                    name="trainCode"
                    fullWidth={true}
                    value={trainRoutes && trainRoutes.trainCode ? trainRoutes.trainCode : ''}
                    type="textField"
                    onChange={handleChange}
                />
                <div className="container-flex">
                    <FormControl fullWidth>
                        <InputLabel id="closureLabel">Closure</InputLabel>
                        <Select
                            labelId="closure"
                            id="closure"
                            value={trainRoutes ? trainRoutes.closure : false}
                            label="Closure"
                            name="closure"
                            onChange={handleChange}
                        >
                            <MenuItem key={1} value={true}>True</MenuItem>
                            <MenuItem key={2} value={false}>False</MenuItem>
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
                    onClick={() => history.push("/train-route")}
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

export default withRouter(TrainRoutesForm);