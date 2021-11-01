import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import StationsTable from "./StationsTable";
import StationsForm from "./StationsForm";


import clsx from "clsx";
import useStyles from "../dashboard/DashBoardStyles";
import {addStation, deleteStationById, getAllStations} from "../data-service/StationDataService";
import {getRegions} from "../data-service/RegionDataService";

export default function Stations() {
    const classes = useStyles();
    clsx(classes.paper, classes.fixedHeight);
    const [stations, setStations] = useState([]);
    const [regions, setRegions] = useState([]);
    const [editItemData, setEditItemData] = useState();


    useEffect(() => {
        getRegions().then((regions) => {
            setRegions(regions)
        });
        getAllStations().then((data) => {
            setStations(data);
        });
    }, []);

    const deleteItemById = (id) => {
        deleteStationById(id).then((result) => {
            if (result) {
                getAllStations().then((data) => {
                    setStations(data);
                });
            }
        });
    };

    const selectItemId = (id) => {
        let result = stations.filter((item) => item.id === id);
        setEditItemData(result[0]);
    };

    const saveStation = (station) => {
        addStation(station).then((result) => {
            if (result) {
                getAllStations().then((data) => {
                    setStations(data);
                });
            }
        });
    };

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <StationsForm
                        regions={regions}
                        saveStation={saveStation}
                        editItemData={editItemData}
                        getAllStations={getAllStations}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <StationsTable
                            data={stations}
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
