import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import SubstituteRoutesTable from "./SubstituteRoutesTable";
import clsx from "clsx";
import useStyles from "../dashboard/DashBoardStyles";
import {getAllSubstituteRoutes} from "../data-service/SubstituteRouteDataService";

export default function SubstituteRoutes() {
    const classes = useStyles();
    clsx(classes.paper, classes.fixedHeight);
    const [substituteRoutes, setSubstituteRoutes] = useState([]);

    useEffect(() => {
        getAllSubstituteRoutes().then((data) => {
            console.log(data)
            setSubstituteRoutes(data);

        });
    }, []);

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <SubstituteRoutesTable
                            data={substituteRoutes}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}
