import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {withRouter} from "react-router-dom";

import {deleteIncidentById, getIncidentById, saveIncident} from "../data-service/IncidentDataService";
import {getAllRails} from "../data-service/RailDataService";
import {ToastInfo} from "../components/ToastError";
import {SCOPES} from "../permission-provider/permission-maps";
import PermissionsGate from "../permission-provider/PermissionGate";

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
    newDate.addHours(1)
    return newDate.toISOString().substring(0, 17) + "00"
}

// eslint-disable-next-line no-extend-native
Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
    return this;
}

function IncidentsForm({isNew, match, history}) {

    const [rails, setRails] = useState([]);
    const [incident, setIncident] = useState({
        id: -1,
        name: "",
        description: "",
        severity: "MINOR",
        affectedRail: {
            id: 1
        },
        // TODO send userID
        // reportedBy: {
        //     id: 1
        // },
        startDate: getDateTime(),
        endDate: getDateTime()
    });

    useEffect(() => {
        getAllRails().then((data) => {
            setRails(data)
        });

        !isNew && getIncidentById(match.params.id).then((data) => {
            setIncident({
                ...data,
                startDate: data.startDate.substring(0, 16),
                endDate: data.endDate ? data.endDate.substring(0, 16) : getDateTime()
            });
        });
    }, [match.params.id]);

    const handleSubmit = () => {
        saveIncident(incident).then((res) => {
            if (res) {
                history.push("/incidents");
                ToastInfo("Incident successfully created");
            }
        });
    };

    const handleDelete = () => {
        deleteIncidentById(incident.id).then((res) => {
            if (res) {
                history.push("/incidents");
                ToastInfo("Incident successfully removed");
            }
        });
    };
    const handleChange = event => {
        const {value, name} = event.target;
        setIncident({...incident, [name]: value})
    }

    return (
        <div className="container">
            <h1>Incidents</h1>
            <div>
                <TextField
                    required
                    margin="normal"
                    label="Name"
                    name="name"
                    fullWidth={true}
                    value={incident && incident.name ? incident.name : ''}
                    type="textField"
                    onChange={handleChange}
                />
                <TextField
                    required
                    margin="normal"
                    label="Description"
                    name="description"
                    fullWidth={true}
                    value={incident && incident.description ? incident.description : ''}
                    type="textField"
                    onChange={handleChange}
                />
                <FormControl fullWidth>
                    <InputLabel id="severityLabel">Severity</InputLabel>
                    <Select
                        value={incident ? incident.severity : "MINOR"}
                        label="Severity"
                        name="severity"
                        onChange={handleChange}
                    >
                        <MenuItem value="MINOR">MINOR</MenuItem>
                        <MenuItem value="MAJOR">MAJOR</MenuItem>
                        <MenuItem value="FATAL">FATAL</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="enableLabel">Affected rail</InputLabel>
                    <Select
                        labelId="affectedRail"
                        id="affectedRail"
                        value={incident.affectedRail.id}
                        label="Enabled"
                        onChange={(event) => {
                            setIncident({...incident, affectedRail: {id: event.target.value}});
                        }}
                    >
                        {rails &&
                        rails.length !== 0 &&
                        rails.map((rail) => (
                            <MenuItem key={rail.id} value={rail.id}>{rail.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    required
                    margin="normal"
                    label="Start date"
                    type="datetime-local"
                    name="startDate"
                    value={incident.startDate}
                    fullWidth={true}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    required
                    margin="normal"
                    label="End date"
                    type="datetime-local"
                    name="endDate"
                    value={incident.endDate}
                    fullWidth={true}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>
            <div className="container-flex">
                <PermissionsGate scopes={[SCOPES.moderator]}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth={true}
                        onClick={handleSubmit}
                    >Save</Button>
                </PermissionsGate>
                <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    fullWidth={true}
                    onClick={() => history.push("/incidents")}
                >Back</Button>
                <PermissionsGate scopes={[SCOPES.admin]}>
                    {!isNew && <Button
                        type="submit"
                        variant="contained"
                        color="default"
                        fullWidth={true}
                        onClick={handleDelete}
                    >Delete</Button>}
                </PermissionsGate>
            </div>
        </div>
    );
}

export default withRouter(IncidentsForm);
