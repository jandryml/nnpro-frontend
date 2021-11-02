import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {withRouter} from "react-router-dom";

import {deleteRailById, getRailById, saveRail} from "../data-service/RailDataService";
import {getAllStations} from "../data-service/StationDataService";
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

function RailsForm({isNew, match, history}) {

    const [stations, setStations] = useState([]);
    const [rail, setRail] = useState({
        id: -1,
        code: "",
        name: "",
        sourceStation: {
            id: 1
        },
        targetStation: {
            id: 1
        },
        enabled: true
    });

    useEffect(() => {
        getAllStations().then((data) => {
            setStations(data)
        });

        !isNew && getRailById(match.params.id).then((data) => {
            setRail(data);
        });
    }, [match.params.id]);

    const handleSubmit = () => {
        saveRail(rail).then((res) => {
            if (res) {
                history.push("/rails");
                ToastInfo("Rail successfully created");
            }
        });
    };

    const handleDelete = () => {
        deleteRailById(rail.id).then((res) => {
            if (res) {
                history.push("/rails");
                ToastInfo("Rail successfully removed");
            }
        });
    };
    const handleChange = event => {
        const {value, name} = event.target;
        setRail({...rail, [name]: value})
        console.log(rail)
    }

    return (
        <div className="container">
            <h1>Rails</h1>
            <div>
                <TextField
                    required
                    id="code"
                    margin="normal"
                    label="Code"
                    name="code"
                    fullWidth={true}
                    value={rail && rail.code ? rail.code : ''}
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
                    value={rail && rail.name ? rail.name : ''}
                    type="textField"
                    onChange={handleChange}
                />
                <div className="container-flex">
                    <FormControl fullWidth>
                        <InputLabel id="sourceStationLabel">Source station</InputLabel>
                        <Select
                            labelId="sourceStation"
                            id="sourceStation"
                            value={rail.sourceStation.id}
                            label="Source station"
                            onChange={(event) => {
                                setRail({...rail, sourceStation: {id: event.target.value}});
                            }}
                        >
                            {stations &&
                            stations.size !== 0 &&
                            stations
                                .map((station) => (
                                    <MenuItem key={station.id} value={station.id}>{station.name}</MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="container-flex">
                    <FormControl fullWidth>
                        <InputLabel id="targetStationLabel">Target station</InputLabel>
                        <Select
                            labelId="targetStation"
                            id="targetStation"
                            value={rail.targetStation.id}
                            label="Target station"
                            onChange={(event) => {
                                setRail({...rail, targetStation: {id: event.target.value}});
                            }}
                        >
                            {stations &&
                            stations.size !== 0 &&
                            stations
                                .map((station) => (
                                    <MenuItem key={station.id} value={station.id}>{station.name}</MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="container-flex">
                    <FormControl fullWidth>
                        <InputLabel id="enableLabel">Enabled</InputLabel>
                        <Select
                            labelId="enabled"
                            id="enabled"
                            value={rail ? rail.enabled : false}
                            label="Enabled"
                            name="enabled"
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
                    onClick={() => history.push("/rails")}
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

export default withRouter(RailsForm);
