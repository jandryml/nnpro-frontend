import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import RailsTable from "./RailsTable";
import RailsForm from "./RailsForm";

import clsx from "clsx";
import useStyles from "../dashboard/DashBoardStyles";
import {getAllStations} from "../data-service/StationDataService";
import {addRail, deleteRailById, getAllRails} from "../data-service/RailDataService";

export default function Rails() {
    const classes = useStyles();
    clsx(classes.paper, classes.fixedHeight);
    const [rails, setRails] = useState([]);
    const [stations, setStations] = useState([]);
    const [editItemData, setEditItemData] = useState();

    useEffect(() => {
        getAllStations().then((regions) => {
            setStations(regions)
        });
        getAllRails().then((data) => {
            setRails(data);
        });
    }, []);

    const deleteItemById = (id) => {
        deleteRailById(id).then((result) => {
            if (result) {
                getAllRails().then((data) => {
                    setRails(data);
                });
            }
        });
    };

    const selectItemId = (id) => {
        let result = rails.filter((item) => item.id === id);
        setEditItemData(result[0]);
    };

    const saveRail = (station) => {
        addRail(station).then((result) => {
            if (result) {
                getAllRails().then((data) => {
                    setRails(data);
                });
            }
        });
    };

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <RailsForm
                        stations={stations}
                        saveRail={saveRail}
                        editItemData={editItemData}
                        getAllRails={getAllRails}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <RailsTable
                            data={rails}
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
