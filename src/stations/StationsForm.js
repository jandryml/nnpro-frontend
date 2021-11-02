import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {withRouter} from "react-router-dom";

import {deleteStationById, getStationById, saveStation} from "../data-service/StationDataService";
import {getRegions} from "../data-service/RegionDataService";
import {ToastInfo} from "../components/ToastError";
import {MapComponent} from "../components/MapComponent";

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

function StationsForm({isNew, match, history}) {

    const [regions, setRegions] = useState([]);
    const [station, setStation] = useState({
        id: -1,
        code: "",
        name: "",
        region: {
            id: 1
        },
        x: 0,
        y: 0
    });

    useEffect(() => {
        getRegions().then((regions) => {
            setRegions(regions)
        });

        !isNew && getStationById(match.params.id).then((data) => {
            setStation(data);
        });
    }, [match.params.id]);

    const handleSubmit = () => {
        saveStation(station).then((res) => {
            if (res) {
                history.push("/stations");
                ToastInfo("Station successfully created");
            }
        });
    };

    const handleDelete = () => {
        deleteStationById(station.id).then((res) => {
            if (res) {
                history.push("/stations");
                ToastInfo("Station successfully removed");
            }
        });
    };

    const handleChange = event => {
        const {value, name} = event.target;
        setStation({...station, [name]: value})
    }

    return (
        <div className="container">
            <h1>Station detail</h1>
            <div>
                <TextField
                    required
                    id="code"
                    margin="normal"
                    label="Code"
                    name="code"
                    fullWidth={true}
                    value={station && station.code ? station.code : ''}
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
                    value={station && station.name ? station.name : ''}
                    type="textField"
                    onChange={handleChange}
                />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Region</InputLabel>
                    <Select
                        labelId="region"
                        value={station && station.region.id}
                        label="Region"
                        onChange={(event) => {
                            setStation({...station, region: {...station.region, id: event.target.value}});
                        }}
                    >
                        {regions &&
                        regions
                            .map((region) => (
                                <MenuItem key={region.id} value={region.id}>{region.name}</MenuItem>
                            ))}
                    </Select>
                </FormControl>
                <TextField
                    required
                    margin="normal"
                    label="Coordinate X"
                    name="x"
                    type="number"
                    fullWidth={true}
                    value={station && station.x ? station.x : 0}
                    onChange={handleChange}
                />
                <TextField
                    required
                    margin="normal"
                    label="Coordinate Y"
                    name="y"
                    type="number"
                    fullWidth={true}
                    value={station && station.y ? station.y : 0}
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
                    onClick={() => history.push("/stations")}
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
            { !isNew && <MapComponent center={{lat: station.x, lng: station.y}} markers={[{lat: station.x, lng: station.y}]}/>}
        </div>
    );
}

export default withRouter(StationsForm);
