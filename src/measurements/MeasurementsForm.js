import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 100,
    },
}));

const getDateTime = () => {
    let newDate = new Date()
    newDate.addHours(2)
    return newDate.toISOString().substring(0, 17) + "00"
}

// eslint-disable-next-line no-extend-native
Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
    return this;
}

function MeasurementsForm({
                              saveMeasurement,
                              editItemData,
                              getDataByInterval,
                          }) {

    const [timestamp, setTimestamp] = useState(getDateTime());
    const [timestampStart, setTimestampStart] = useState(getDateTime());
    const [timestampEnd, setTimestampEnd] = useState(getDateTime());
    const [id, setId] = useState(null);
    const [weight, setWeight] = useState(null);
    const [abdomenSize, setAbdomenSize] = useState(null);
    const [chestSize, setChestSize] = useState(null);
    const [leftHandSize, setLeftHandSize] = useState(null);
    const [rightHandSize, setRightHandSize] = useState(null);
    const [leftLegSize, setLeftLegSize] = useState(null);
    const [rightLegSize, setRightLegSize] = useState(null);


    useEffect(() => {
        if (editItemData) {
            setId(editItemData.id);
            setTimestamp(editItemData.timestamp);
            setWeight(editItemData.weight);
            setAbdomenSize(editItemData.abdomenSize);
            setChestSize(editItemData.chestSize);
            setLeftHandSize(editItemData.leftHandSize);
            setRightHandSize(editItemData.rightHandSize);
            setLeftLegSize(editItemData.leftLegSize);
            setRightLegSize(editItemData.rightLegSize);
        }
    }, [editItemData]);

    const submit = () => {
        saveMeasurement({
            id,
            timestamp,
            weight,
            abdomenSize,
            chestSize,
            leftHandSize,
            rightHandSize,
            leftLegSize,
            rightLegSize,
        });
    };

    const submitEdit = () => {
        saveMeasurement({
            timestamp,
            weight,
            abdomenSize,
            chestSize,
            leftHandSize,
            rightHandSize,
            leftLegSize,
            rightLegSize,
        });
    };

    const load = () => {
        getDataByInterval({
            start: timestampStart,
            end: timestampEnd,
        });
    };

    return (
        <div className="container">
            <h1>Measurements</h1>
            <TextField
                required
                margin="normal"
                id="datetime-local"
                label="Date time"
                type="datetime-local"
                value={timestamp}
                fullWidth={true}
                onChange={(e) => setTimestamp(e.target.value)}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <div className="container-flex">
                <TextField
                    required
                    id="weight"
                    margin="normal"
                    label="Weight"
                    name="weight"
                    fullWidth={true}
                    value={weight}
                    type="number"
                    onChange={(e) => setWeight(!e.target.value ? null : Math.abs(e.target.value))}
                />
                <TextField
                    required
                    id="abdomenSize"
                    margin="normal"
                    label="Abdomen size"
                    name="abdomenSize"
                    fullWidth={true}
                    value={abdomenSize}
                    type="number"
                    onChange={(e) => setAbdomenSize(!e.target.value ? null : Math.abs(e.target.value))}
                />
                <TextField
                    required
                    id="chestSize"
                    margin="normal"
                    label="Chest size"
                    name="chestSize"
                    type="number"
                    fullWidth={true}
                    value={chestSize}
                    onChange={(e) => setChestSize(!e.target.value ? null : Math.abs(e.target.value))}
                />
                <TextField
                    required
                    id="leftHandSize"
                    margin="normal"
                    label="Left hand size"
                    name="leftHandSize"
                    type="number"
                    fullWidth={true}
                    value={leftHandSize}
                    onChange={(e) => setLeftHandSize(!e.target.value ? null : Math.abs(e.target.value))}
                />
                <TextField
                    required
                    margin="normal"
                    id="rightHandSize"
                    label="Right hand size"
                    name="rightHandSize"
                    type="number"
                    fullWidth={true}
                    value={rightHandSize}
                    onChange={(e) => setRightHandSize(!e.target.value ? null : Math.abs(e.target.value))}
                />
                <TextField
                    required
                    margin="normal"
                    id="leftLegSize"
                    label="Left leg size"
                    name="leftLegSize"
                    type="number"
                    fullWidth={true}
                    value={leftLegSize}
                    onChange={(e) => setLeftLegSize(!e.target.value ? null : Math.abs(e.target.value))}
                />
                <TextField
                    required
                    margin="normal"
                    id="rightLegSize"
                    label="Right leg size"
                    name="rightLegSize"
                    type="number"
                    fullWidth={true}
                    value={rightLegSize}
                    onChange={(e) => setRightLegSize(!e.target.value ? null : Math.abs(e.target.value))}
                />
            </div>
            <div className="container-flex">
                <Button
                    type="submit"
                    margin="normal"
                    variant="contained"
                    color="secondary"
                    fullWidth={true}
                    onClick={submit}
                    disabled={!id}
                >
                    Edit
                </Button>
                <Button
                    type="submit"
                    margin="normal"
                    variant="contained"
                    color="default"
                    fullWidth={true}
                    onClick={submitEdit}
                >
                    New
                </Button>
            </div>
            <div className="container-flex">
                <TextField
                    required
                    margin="normal"
                    id="datetime-local-start"
                    label="Date time start"
                    type="datetime-local"
                    value={timestampStart}
                    fullWidth={true}
                    onChange={(e) => setTimestampStart(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    required
                    margin="normal"
                    id="datetime-local-end"
                    label="Date time end"
                    type="datetime-local"
                    value={timestampEnd}
                    fullWidth={true}
                    onChange={(e) => setTimestampEnd(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={load}
                fullWidth={true}
            >
                Load
            </Button>
        </div>
    );
}

export default MeasurementsForm;
