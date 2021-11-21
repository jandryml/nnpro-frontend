import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TrainRoutesTable from "./TrainRoutesTable";

import clsx from "clsx";
import useStyles from "../dashboard/DashBoardStyles";
import {getAllTrainRoutes} from "../data-service/TrainRouteDataService";

export default function TrainRoutes() {
    const classes = useStyles();
    clsx(classes.paper, classes.fixedHeight);
    const [trainRoutes, setTrainRoutes] = useState([]);

    useEffect(() => {
        getAllTrainRoutes().then((data) => {
            setTrainRoutes(data);
        });
    }, []);

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <TrainRoutesTable
                            data={trainRoutes}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}
