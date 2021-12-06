import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {withRouter} from "react-router-dom";
import {deleteChauffeurRouteById, getChauffeurById, saveChauffeur} from "../data-service/ChauffeurDataService";
import {getAllVehicles} from "../data-service/VehicleDataService";
import {ToastInfo} from "../components/ToastError";
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

function ChauffeursForm({isNew, match, history}) {

    const [vehicles, setVehicles] = useState([]);
    //const [selected, setSelected] = useState([]);
    const [chauffeurs, setChauffeurs] = useState({
        id: -1,
        firstname: "",
        lastname: "",
        drivingLicense: "",
        drivingExperience: "",
        phoneNumber: "",
        vehicleId: -1
    });

    useEffect(() => {
        getAllVehicles().then((data) => {
            setVehicles(data)
        });
        !isNew && getChauffeurById(match.params.id).then((data) => {
            setChauffeurs(data);
        });
    }, [match.params.id]);

    // const handleSetChange = (event) => {
    //     setSelected(event.target.value);
    // };

    const handleSubmit = () => {
        saveChauffeur(chauffeurs).then((res) => {
            if (res) {
                history.push("/chauffeur");
                ToastInfo("Chauffeur successfully created");
            }
        });
    };

    const handleDelete = () => {
        deleteChauffeurRouteById(chauffeurs.id).then((res) => {
            if (res) {
                history.push("/chauffeur");
                ToastInfo("Chauffeur successfully removed");
            }
        });
    };

    const handleChange = event => {
        const {value, name} = event.target;
        setChauffeurs({...chauffeurs, [name]: value})
    }

    return (
        <div className="container">
            <h1>Chauffeur detail</h1>
            <div>
                <TextField
                    required
                    id="firstname"
                    margin="normal"
                    label="Firstname"
                    name="firstname"
                    fullWidth={true}
                    value={chauffeurs && chauffeurs.firstname ? chauffeurs.firstname : ''}
                    type="textField"
                    onChange={handleChange}
                />
                <TextField
                    required
                    id="lastname"
                    margin="normal"
                    label="Lastname"
                    name="lastname"
                    fullWidth={true}
                    value={chauffeurs && chauffeurs.lastname ? chauffeurs.lastname : ''}
                    type="textField"
                    onChange={handleChange}
                />
                <TextField
                    required
                    id="drivingLicense"
                    margin="normal"
                    label="Driving license"
                    name="drivingLicense"
                    fullWidth={true}
                    value={chauffeurs && chauffeurs.drivingLicense ? chauffeurs.drivingLicense : ''}
                    type="textField"
                    onChange={handleChange}
                />
                <TextField
                    required
                    id="drivingExperience"
                    margin="normal"
                    label="Driving experience"
                    name="drivingExperience"
                    fullWidth={true}
                    value={chauffeurs && chauffeurs.drivingExperience ? chauffeurs.drivingExperience : ''}
                    type="textField"
                    onChange={handleChange}
                />
                <TextField
                    required
                    id="phoneNumber"
                    margin="normal"
                    label="Phone number"
                    name="phoneNumber"
                    fullWidth={true}
                    value={chauffeurs && chauffeurs.phoneNumber ? chauffeurs.phoneNumber : ''}
                    type="textField"
                    onChange={handleChange}
                />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Vehicle</InputLabel>
                    <Select
                        labelId="vehicles"
                        value={chauffeurs && chauffeurs.vehicleId}
                        label="Vehicle"
                        onChange={(event) => {
                            setChauffeurs({...chauffeurs, vehicleId: event.target.value});
                        }}
                    >
                        {vehicles &&
                        vehicles
                            .map((vehicles) => (
                                <MenuItem key={vehicles.id}
                                          value={vehicles.id}>{vehicles.name}</MenuItem>
                            ))}
                    </Select>
                </FormControl>
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
                    onClick={() => history.push("/chauffeur")}
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

export default withRouter(ChauffeursForm);
