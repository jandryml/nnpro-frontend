import React, {useEffect} from 'react'
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";

export const StationsFiltered = ({stations, selectedStation, setSelectedStation}) => {

    return (
            <FormControl fullWidth>
                <InputLabel id="sourceStationLabel">New station</InputLabel>
                <Select
                    labelId="sourceStation"
                    id="sourceStation"
                    value={selectedStation.id}
                    label="Source station"
                    onChange={(event) => {
                        setSelectedStation(event.target.value);
                    }}
                >
                    {stations
                        .map((station) => (
                            <MenuItem key={station.id} value={station.id}>{station.name}</MenuItem>
                        ))}
                </Select>
            </FormControl>
    );
}
