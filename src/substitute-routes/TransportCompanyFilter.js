import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {FormControl, InputLabel, MenuItem, OutlinedInput, Select} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import {getAllTransportCompanies} from "../data-service/TransportCompanyDataService";

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function TransportCompanyFilter({updateVehicles}) {

    const [transportCompany, setTransportCompany] = useState([]);
    const [selectedTransportCompany, setSelectedTransportCompany] = useState([]);

    useEffect(() => {
        if (!transportCompany || transportCompany.length === 0) {
            getAllTransportCompanies().then((data) => {
                setTransportCompany(data)
            });
        } else {
            updateVehicles(selectedTransportCompany)
        }
    }, [selectedTransportCompany]);

    const handleChangeMultiple = (event) => {
        const {
            target: {value},
        } = event;
        setSelectedTransportCompany(typeof value === 'string' ? value.split(',') : value)
    };


    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Transport company</InputLabel>
            <Select
                labelId="transportCompany"
                label="Region"
                multiple
                value={selectedTransportCompany}
                onChange={handleChangeMultiple}
            >
                {transportCompany &&
                    transportCompany
                        .map((transportCompany) => (
                            <MenuItem key={transportCompany.id}
                                      value={transportCompany.id}>{transportCompany.name}</MenuItem>
                        ))}
            </Select>
        </FormControl>
    )
}

export default withRouter(TransportCompanyFilter);
