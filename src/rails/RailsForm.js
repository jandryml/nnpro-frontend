import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";

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

function RailsForm({
                       stations,
                       saveRail,
                       editItemData,
                       getAllRails,
                   }) {

    const [id, setId] = useState(null);
    const [code, setCode] = useState(null);
    const [name, setName] = useState(null);
    const [sourceStation, setSourceStation] = useState(1);
    const [targetStation, setTargetStation] = useState(2);
    const [enabled, setEnabled] = useState(null);

    const [sourceStationId, setSourceStationId] = useState('');
    const [targetStationId, setTargetStationId] = useState('');
    const [enabledId, setEnabledId] = useState(0);

    useEffect(() => {
        if (editItemData) {
            setId(editItemData.id);
            setCode(editItemData.code);
            setName(editItemData.name);
            setSourceStation(editItemData.sourceStation);
            setTargetStation(editItemData.targetStation);
            setEnabled(editItemData.enabled);

            setEnabledId(editItemData.enabled === false ? 1 : 0)
            setSourceStationId(editItemData.sourceStation.id)
            setTargetStationId(editItemData.targetStation.id)
        }
    }, [editItemData]);

    const submit = () => {
        saveRail({
            id,
            code,
            name,
            sourceStation,
            targetStation,
            enabled
        });
    };

    const submitEdit = () => {
        saveRail({
            code,
            name,
            sourceStation,
            targetStation,
            enabled
        });
    };

    const load = () => {
        getAllRails();
    };

    const handleChangeEnabled = (event) => {
        setEnabled(event.target.value === 0);
        setEnabledId(event.target.value)
    }

    const handleChangeSourceStation = (event) => {
        let station = stations.filter((station) => station.id === event.target.value)[0]
        setSourceStation(station);
        setSourceStationId(event.target.value)
    }

    const handleChangeTargetStation = (event) => {
        let station = stations.filter((station) => station.id === event.target.value)[0]
        setTargetStation(station);
        setTargetStationId(event.target.value)
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
                    value={code || ''}
                    type="textField"
                    onChange={(e) => setCode(!e.target.value ? null : e.target.value)}
                />
                <TextField
                    required
                    id="name"
                    margin="normal"
                    label="Name"
                    name="name"
                    fullWidth={true}
                    value={name || ''}
                    type="textField"
                    onChange={(e) => setName(!e.target.value ? null : e.target.value)}
                />
                <div className="container-flex">
                    <FormControl fullWidth>
                        <InputLabel id="sourceStationLabel">Source station</InputLabel>
                        <Select
                            labelId="sourceStation"
                            id="sourceStation"
                            value={sourceStationId}
                            label="Source station"
                            onChange={handleChangeSourceStation}
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
                            value={targetStationId}
                            label="Target station"
                            onChange={handleChangeTargetStation}
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
                            value={enabledId}
                            label="Enabled"
                            onChange={handleChangeEnabled}

                        >
                            <MenuItem key={1} value={0}>Activated</MenuItem>
                            <MenuItem key={2} value={1}>Deactivated</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            <div className="container-flex">
                <Button
                    type="submit"
                    margin="normal"
                    variant="contained"
                    color="secondary"
                    fullWidth={true}
                    onClick={submit}
                    disabled={!id}
                >
                    Edit
                </Button>
                <br/>
                <Button
                    type="submit"
                    margin="normal"
                    variant="contained"
                    color="default"
                    fullWidth={true}
                    onClick={submitEdit}
                >
                    New
                </Button>
            </div>
            {/*            <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={load}
                fullWidth={true}
            >
                Load
            </Button>*/}
        </div>
    );
}

export default RailsForm;
