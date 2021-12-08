import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {FormControl, InputLabel, MenuItem, OutlinedInput, Select} from "@material-ui/core";
import {withRouter} from "react-router-dom";

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

function VehiclesFilter({vehicles, substituteRoutes, setSubstituteRoutes}) {

    const handleChangeMultiple = (event) => {
        const {
            target: {value},
        } = event;

        setSubstituteRoutes({...substituteRoutes, vehicleIds: typeof value === 'string' ? value.split(',') : value})
    };


    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Vehicles</InputLabel>
            <Select
                labelId="vehicles"
                label="Vehicles"
                multiple
                value={substituteRoutes.vehicleIds}
                onChange={handleChangeMultiple}
            >
                {vehicles &&
                    vehicles
                        .map((vehicle) => (
                            <MenuItem key={vehicle.id}
                                      value={vehicle.id}>{`${vehicle.name} - ${vehicle.capacity}`}</MenuItem>
                        ))}
            </Select>
        </FormControl>
    )
}

export default withRouter(VehiclesFilter);
