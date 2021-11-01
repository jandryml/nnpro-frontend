import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import IncidentsTable from "./IncidentsTable";
import IncidentsForm from "./IncidentsForm";

import clsx from "clsx";
import useStyles from "../dashboard/DashBoardStyles";
import {getAllRails} from "../data-service/RailDataService";
import {addIncident, deleteIncidentById, getAllIncidents} from "../data-service/IncidentDataService";

export default function Incidents() {
    const classes = useStyles();
    clsx(classes.paper, classes.fixedHeight);
    const [incidents, setIncidents] = useState([]);
    const [rails, setRails] = useState([]);
    const [editItemData, setEditItemData] = useState();

    useEffect(() => {
        getAllRails().then((rails) => {
            setRails(rails)
        });
        getAllIncidents().then((data) => {
            setIncidents(data);
        });
    }, []);

    const deleteItemById = (id) => {
        deleteIncidentById(id).then((result) => {
            if (result) {
                getAllRails().then((data) => {
                    setIncidents(data);
                });
            }
        });
    };

    const selectItemId = (id) => {
        let result = incidents.filter((item) => item.id === id);
        setEditItemData(result[0]);
    };

    const saveIncident = (incident) => {
        addIncident(incident).then((result) => {
            if (result) {
                getAllIncidents().then((data) => {
                    setIncidents(data);
                });
            }
        });
    };

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <IncidentsForm
                        rails={rails}
                        saveIncident={saveIncident}
                        editItemData={editItemData}
                        getAllRails={getAllRails}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <IncidentsTable
                            data={incidents}
                            deleteItemById={deleteItemById}
                            selectItemId={selectItemId}
                        />
                    </Paper>
                </Grid>
                {/*                <Grid item xs={12}>
                    <Paper className={fixedHeightPaper}>
                        <Chart
                            data={measurements}
                            typeLine="weight"
                            name="Weight"
                            color="blue"
                        />
                    </Paper>
                </Grid>*/}
            </Grid>
        </div>
    );
}

/*
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <Deposits />
          </Paper>
        </Grid>
*/
