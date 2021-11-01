import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";

makeStyles((theme) => ({
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

function StationsForm({
                          regions,
                          saveStation,
                          editItemData,
                          getAllStations,
                      }) {

    const [id, setId] = useState(null);
    const [code, setCode] = useState(null);
    const [name, setName] = useState(null);
    const [region, setRegion] = useState(1);
    const [x, setX] = useState(null);
    const [y, setY] = useState(null);
    const [selectedId, setSelectedId] = useState('');


    useEffect(() => {
        if (editItemData) {
            setId(editItemData.id);
            setCode(editItemData.code);
            setName(editItemData.name);
            setRegion(editItemData.region);
            setX(editItemData.x);
            setY(editItemData.y);
            setSelectedId(editItemData.region.id)
        }
    }, [editItemData]);

    const submit = () => {
        saveStation({
            id,
            code,
            name,
            region,
            x,
            y
        });
    };

    const submitEdit = () => {
        saveStation({
            code,
            name,
            region,
            x,
            y
        });
    };

    const load = () => {
        getAllStations();
    };

    const handleChange = (event) => {
        let region = regions.filter((region) => region.id === event.target.value)[0]
        setRegion(region);
        setSelectedId(event.target.value)
    };

    return (
        <div className="container">
            <h1>Stations</h1>
            <div>
                <TextField
                    required
                    id="code"
                    margin="normal"
                    label="Code"
                    name="code"
                    fullWidth={true}
                    value={code || ''}
                    type="textField"
                    onChange={(e) => setCode(!e.target.value ? null : e.target.value)}
                />
                <TextField
                    required
                    id="name"
                    margin="normal"
                    label="Name"
                    name="name"
                    fullWidth={true}
                    value={name || ''}
                    type="textField"
                    onChange={(e) => setName(!e.target.value ? null : e.target.value)}
                />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Region</InputLabel>
                    <Select
                        labelId="region"
                        id="region"
                        value={selectedId}
                        label="Region"
                        onChange={handleChange}
                    >
                        {regions &&
                        regions.size !== 0 &&
                        regions
                            .map((region) => (
                                <MenuItem key={region.id} value={region.id}>{region.name}</MenuItem>
                            ))}
                    </Select>
                </FormControl>
                <TextField
                    required
                    id="x"
                    margin="normal"
                    label="Coordinate X"
                    name="x"
                    type="number"
                    fullWidth={true}
                    value={x || ''}
                    onChange={(e) => setX(!e.target.value ? null : e.target.value)}
                />
                <TextField
                    required
                    margin="normal"
                    id="y"
                    label="Coordinate Y"
                    name="y"
                    type="number"
                    fullWidth={true}
                    value={y || ''}
                    onChange={(e) => setY(!e.target.value ? null : e.target.value)}
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
            {/*            <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={load}
                fullWidth={true}
            >
                Load
            </Button>*/}
        </div>
    );
}

export default StationsForm;
