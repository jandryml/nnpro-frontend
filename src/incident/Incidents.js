import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import IncidentsTable from "./IncidentsTable";

import clsx from "clsx";
import useStyles from "../dashboard/DashBoardStyles";
import {getAllIncidents} from "../data-service/IncidentDataService";

export default function Incidents() {
    const classes = useStyles();
    clsx(classes.paper, classes.fixedHeight);
    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
        getAllIncidents().then((data) => {
            setIncidents(data);
        });
    }, []);

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <IncidentsTable data={incidents}/>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}