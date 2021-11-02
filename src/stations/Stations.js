import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import StationsTable from "./StationsTable";

import clsx from "clsx";
import useStyles from "../dashboard/DashBoardStyles";
import {getAllStations} from "../data-service/StationDataService";

export default function Stations() {
    const classes = useStyles();
    clsx(classes.paper, classes.fixedHeight);
    const [stations, setStations] = useState([]);

    useEffect(() => {

        getAllStations().then((data) => {
            setStations(data);
        });
    }, []);

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <StationsTable
                            data={stations}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}