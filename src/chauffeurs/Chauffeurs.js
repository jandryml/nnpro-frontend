import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ChauffeursTable from "./ChauffeursTable";

import clsx from "clsx";
import useStyles from "../dashboard/DashBoardStyles";
import {getAllChauffeurs} from "../data-service/ChauffeurDataService";
import {getAllVehicles} from "../data-service/VehicleDataService";

export default function Chauffeurs() {
    const classes = useStyles();
    clsx(classes.paper, classes.fixedHeight);
    const [chauffeurs, setChauffeurs] = useState([]);
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        getAllVehicles().then((data) => {
            setVehicles(data)
        });
        getAllChauffeurs().then((data) => {
            setChauffeurs(data);
        });
    }, []);

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <ChauffeursTable
                            data={chauffeurs}
                            vehicles={vehicles}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}
