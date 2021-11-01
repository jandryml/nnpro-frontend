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

const getDateTime = () => {
    let newDate = new Date()
    newDate.addHours(2)
    return newDate.toISOString().substring(0, 17) + "00"
}

// eslint-disable-next-line no-extend-native
Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
    return this;
}

const getSeverityId = (severity) => {
    switch (severity) {
        case "MINOR":
            return 0
        case "MAJOR":
            return 1
        default:
            return 2
    }
}

const getSeverityById = (id) => {
    switch (id) {
        case 0:
            return "MINOR"
        case 1:
            return "MAJOR"
        default:
            return "FATAL"
    }
}

function IncidentsForm({
                           rails,
                           saveIncident,
                           editItemData,
                           getAllRails,
                       }) {

    const [id, setId] = useState(null);
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    const [severity, setSeverity] = useState(null);
    const [affectedRail, setAffectedRail] = useState(null);
    const [startDate, setStartDate] = useState(getDateTime());
    const [endDate, setEndDate] = useState(getDateTime());

    const [affectedRailId, setAffectedRailId] = useState('');
    const [severityId, setSeverityId] = useState(0);

    useEffect(() => {
        if (editItemData) {
            setId(editItemData.id);
            setName(editItemData.name);
            setDescription(editItemData.description);

            setSeverity(editItemData.severity);
            setAffectedRail(editItemData.affectedRail);
            setStartDate(editItemData.startDate.substring(0, 16))
            setEndDate(editItemData.endDate.substring(0, 16))

            setSeverityId(getSeverityId(editItemData.severity))
            setAffectedRailId(editItemData.affectedRail.id)
        }
    }, [editItemData]);

    const submit = () => {
        saveIncident({
            id,
            name,
            description,
            severity,
            affectedRail,
            startDate,
            endDate
        });
    };

    const submitEdit = () => {
        saveIncident({
            name,
            description,
            severity,
            affectedRail,
            startDate,
            endDate
        });
    };

    const load = () => {
        getAllRails();
    };

    const handleChangeSeverity = (event) => {
        setSeverity(getSeverityById(event.target.value));
        setSeverityId(event.target.value)
    }

    const handleChangeAffectedRail = (event) => {
        let rail = rails.filter((station) => station.id === event.target.value)[0]
        setAffectedRail(rail);
        setAffectedRailId(event.target.value)
    }

    const setStartDateA = (value) => {
        console.log(value)
    }

    return (
        <div className="container">
            <h1>Incidents</h1>
            <div>
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
                <TextField
                    required
                    id="description"
                    margin="normal"
                    label="Description"
                    name="description"
                    fullWidth={true}
                    value={description || ''}
                    type="textField"
                    onChange={(e) => setDescription(!e.target.value ? null : e.target.value)}
                />
                <FormControl fullWidth>
                    <InputLabel id="severityLabel">Severity</InputLabel>
                    <Select
                        labelId="severity"
                        id="severity"
                        value={severityId}
                        label="Severity"
                        onChange={handleChangeSeverity}
                    >
                        <MenuItem key={0} value={0}>{"MINOR"}</MenuItem>
                        <MenuItem key={1} value={1}>{"MAJOR"}</MenuItem>
                        <MenuItem key={2} value={2}>{"FATAL"}</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="enableLabel">Affected rail</InputLabel>
                    <Select
                        labelId="affectedRail"
                        id="affectedRail"
                        value={affectedRailId}
                        label="Enabled"
                        onChange={handleChangeAffectedRail}
                    >
                        {rails &&
                        rails.size !== 0 &&
                        rails
                            .map((rail) => (
                                <MenuItem key={rail.id} value={rail.id}>{rail.name}</MenuItem>
                            ))}
                    </Select>
                </FormControl>
                <TextField
                    required
                    margin="normal"
                    id="startDate"
                    label="Start date"
                    type="datetime-local"
                    value={startDate}
                    fullWidth={true}
                    onChange={(e) => setStartDate(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    required
                    margin="normal"
                    id="endDate"
                    label="End date"
                    type="datetime-local"
                    value={endDate}
                    fullWidth={true}
                    onChange={(e) => setEndDate(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
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

export default IncidentsForm;
