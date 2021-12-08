import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import UsersTable from "./UsersTable";

import clsx from "clsx";
import useStyles from "../dashboard/DashBoardStyles";
import {getAllUsers} from "../data-service/UsersDataService";

export default function Users() {
    const classes = useStyles();
    clsx(classes.paper, classes.fixedHeight);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        console.log("USER GET")
        getAllUsers().then((data) => {
            console.log(data)
            setUsers(data);
        });
    }, []);

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <UsersTable
                            data={users}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}
