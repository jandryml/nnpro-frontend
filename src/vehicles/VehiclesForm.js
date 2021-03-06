import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {withRouter} from "react-router-dom";

import {deleteVehicleById, getVehicleById, saveVehicle} from "../data-service/VehicleDataService";
import {ToastInfo} from "../components/ToastError";
import {getAllTransportCompanies} from "../data-service/TransportCompanyDataService";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {DropzoneArea} from "material-ui-dropzone";
import PermissionsGate from "../permission-provider/PermissionGate";
import {SCOPES} from "../permission-provider/permission-maps";

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

function VehiclesForm({isNew, match, history}) {
    const [transportCompany, setTransportCompany] = useState([]);
    const [vehicles, setVehicles] = useState({
        id: -1,
        name: "",
        capacity: "",
        color: "",
        year: 1900,
        actuation: "",
        companyId: -1,
        image: ""
    });

    useEffect(() => {
        getAllTransportCompanies().then((data) => {
            setTransportCompany(data)
        });
        !isNew && getVehicleById(match.params.id).then((data) => {
            setVehicles(data);
        });
    }, [match.params.id]);

    const handleSubmit = () => {
        saveVehicle(vehicles).then((res) => {
            if (res) {
                history.push("/vehicle");
                ToastInfo("Vehicle successfully created");
            }
        });
    };

    const handleDelete = () => {
        deleteVehicleById(vehicles.id).then((res) => {
            if (res) {
                history.push("/vehicle");
                ToastInfo("Vehicle successfully removed");
            }
        });
    };

    const handleChange = event => {
        const {value, name} = event.target;
        setVehicles({...vehicles, [name]: value})
    }

    const handleChangeImage = (files) => {
        console.log(files)
        setVehicles({...vehicles, image: files})
    }

    const onDropHandler = (files) => {
        if (files && files.length !== 0) {
            let file = files[0]
            const reader = new FileReader();
            reader.onload = (event) => {
                setVehicles({...vehicles, image: event.target.result})
            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <div className="container">
            <PermissionsGate scopes={[SCOPES.admin]} showError img>
                <div className="imagevehicle">
                    {vehicles.image && vehicles.image.length !== 0 &&
                    <img src={vehicles.image} height="250px" alt='nevim'/>
                    }
                    <DropzoneArea
                        multiple={false}
                        acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                        onChange={onDropHandler}
                    />
                </div>
                <h1>Vehicles detail</h1>
                <div>
                    <TextField
                        required
                        id="name"
                        margin="normal"
                        label="Name"
                        name="name"
                        fullWidth={true}
                        value={vehicles && vehicles.name ? vehicles.name : ''}
                    type="textField"
                    onChange={handleChange}
                />
                <TextField
                    required
                    id="capacity"
                    margin="normal"
                    label="Capacity"
                    name="capacity"
                    fullWidth={true}
                    value={vehicles && vehicles.capacity ? vehicles.capacity : 0}
                    type="number"
                    onChange={handleChange}
                />
                <TextField
                    required
                    id="color"
                    margin="normal"
                    label="Color"
                    name="color"
                    fullWidth={true}
                    value={vehicles && vehicles.color ? vehicles.color : ''}
                    type="textField"
                    onChange={handleChange}
                />
                <TextField
                    required
                    id="year"
                    margin="normal"
                    label="Year"
                    name="year"
                    fullWidth={true}
                    value={vehicles && vehicles.year ? vehicles.year : 1900}
                    type="number"
                    onChange={handleChange}
                />
                <TextField
                    required
                    id="actuation"
                    margin="normal"
                    label="Actuation"
                    name="actuation"
                    fullWidth={true}
                    value={vehicles && vehicles.actuation ? vehicles.actuation : ''}
                    type="textField"
                    onChange={handleChange}
                />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Transport company</InputLabel>
                    <Select
                        labelId="transportCompany"
                        value={vehicles && vehicles.companyId}
                        label="Transport company"
                        onChange={(event) => {
                            setVehicles({...vehicles, companyId: event.target.value});
                        }}
                    >
                        {transportCompany &&
                        transportCompany
                            .map((transportCompany) => (
                                <MenuItem key={transportCompany.id}
                                          value={transportCompany.id}>{transportCompany.name}</MenuItem>
                            ))}
                    </Select>
                </FormControl>
                </div>

                <div className="container-flex">
                    <PermissionsGate scopes={[SCOPES.admin]} showError>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth={true}
                            onClick={handleSubmit}
                        >
                            Save
                        </Button>
                    </PermissionsGate>
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        fullWidth={true}
                        onClick={() => history.push("/vehicle")}
                    >Back</Button>
                    <PermissionsGate scopes={[SCOPES.admin]}>
                        {!isNew && <Button
                            type="submit"
                            variant="contained"
                            color="default"
                            fullWidth={true}
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>}
                    </PermissionsGate>
                </div>
            </PermissionsGate>
        </div>
    );
}

export default withRouter(VehiclesForm);
