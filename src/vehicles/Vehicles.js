import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import VehiclesTable from "./VehiclesTable";

import clsx from "clsx";
import useStyles from "../dashboard/DashBoardStyles";
import {getAllVehicles} from "../data-service/VehicleDataService";
import {getAllTransportCompanies} from "../data-service/TransportCompanyDataService";

export default function Vehicles() {
    const classes = useStyles();
    clsx(classes.paper, classes.fixedHeight);
    const [transportCompany, setTransportCompany] = useState([]);
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        getAllTransportCompanies().then((data) => {
            setTransportCompany(data)
        });
        getAllVehicles().then((data) => {
            setVehicles(data);
        });
    }, []);

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <VehiclesTable
                            data={vehicles}
                            transportCompany={transportCompany}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}
