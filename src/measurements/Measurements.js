import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Chart from "../dashboard/Chart";
import MeasurementsTable from "./MeasurementsTable";
import MeasurementsForm from "./MeasurementsForm";

import clsx from "clsx";
import useStyles from "../dashboard/DashBoardStyles";
import {
    addMeasurements,
    deleteMeasurementById,
    getAllMeasurements,
    getIntervalMeasurements,
} from "../data-service/MeasurementsDataService";

export default function Measurements() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [measurements, setMeasurements] = useState([]);
    const [editItemData, setEditItemData] = useState();

    useEffect(() => {
        getAllMeasurements().then((data) => {
            setMeasurements(data);
        });
    }, []);

    const getDataByInterval = (interval) => {
        getIntervalMeasurements(interval).then((data) => {
            setMeasurements(data);
        });
    };

    const deleteItemById = (id) => {
        deleteMeasurementById(id).then((result) => {
            if (result) {
                getAllMeasurements().then((data) => {
                    setMeasurements(data);
                });
            }
        });
    };

    const selectItemId = (id) => {
        let result = measurements.filter((item) => item.id === id);
        setEditItemData(result[0]);
    };

    const saveMeasurement = (measurement) => {
        addMeasurements(measurement).then((result) => {
            if (result) {
                getAllMeasurements().then((data) => {
                    setMeasurements(data);
                });
            }
        });
    };

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <MeasurementsForm
                        saveMeasurement={saveMeasurement}
                        editItemData={editItemData}
                        getDataByInterval={getDataByInterval}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <MeasurementsTable
                            data={measurements}
                            deleteItemById={deleteItemById}
                            selectItemId={selectItemId}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={fixedHeightPaper}>
                        <Chart
                            data={measurements}
                            typeLine="weight"
                            name="Weight"
                            color="blue"
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={fixedHeightPaper}>
                        <Chart
                            data={measurements}
                            typeLine="abdomenSize"
                            name="Abdomen size"
                            color="red"
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={fixedHeightPaper}>
                        <Chart
                            data={measurements}
                            typeLine="abdomenSize"
                            name="Chest size"
                            color="green"
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={fixedHeightPaper}>
                        <Chart
                            data={measurements}
                            typeLine="leftHandSize"
                            name="Left hand size"
                            color="black"
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={fixedHeightPaper}>
                        <Chart
                            data={measurements}
                            typeLine="rightHandSize"
                            name="Right hand size"
                            color="black"
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={fixedHeightPaper}>
                        <Chart
                            data={measurements}
                            typeLine="leftLegSize"
                            name="Left leg size"
                            color="orange"
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={fixedHeightPaper}>
                        <Chart
                            data={measurements}
                            typeLine="leftLegSize"
                            name="Right leg size"
                            color="orange"
                        />
                    </Paper>
                </Grid>
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
