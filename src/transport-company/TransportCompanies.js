import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TransportCompaniesTable from "./TransportCompaniesTable";

import clsx from "clsx";
import useStyles from "../dashboard/DashBoardStyles";
import {getAllTransportCompanies} from "../data-service/TransportCompanyDataService";

export default function TransportCompanies() {
    const classes = useStyles();
    clsx(classes.paper, classes.fixedHeight);
    const [transportCompanies, setTransportCompanies] = useState([]);

    useEffect(() => {
        getAllTransportCompanies().then((data) => {
            setTransportCompanies(data);
        });
    }, []);

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <TransportCompaniesTable
                            data={transportCompanies}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}
