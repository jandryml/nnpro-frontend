import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import RailsTable from "./RailsTable";

import clsx from "clsx";
import useStyles from "../dashboard/DashBoardStyles";
import {getAllRails} from "../data-service/RailDataService";

export default function Rails() {
    const classes = useStyles();
    clsx(classes.paper, classes.fixedHeight);
    const [rails, setRails] = useState([]);

    useEffect(() => {
        getAllRails().then((data) => {
            setRails(data);
        });
    }, []);

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <RailsTable data={rails}/>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}