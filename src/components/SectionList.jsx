import React, {useEffect, useState} from 'react'
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {getAllStations} from "../data-service/StationDataService";

export const SectionList = ({stationsStop, setStationsStop}) => {

    const [stations, setStations] = useState([]);

    const handleRemoveClick = index => {
        const list = [...stationsStop];
        list.splice(index, 1);
        setStationsStop(list);
    };

    useEffect(() => {
        getAllStations().then((data) => {
            setStations(data)
        })
    }, [])

    const handleAddClick = () => {
        setStationsStop([...stationsStop, {id: -1}]);
    };

    return (
        <div className="App">
            <h3>Train station stops</h3>
            {stationsStop.map((x, i) => {
                return (
                    <div key={i} className="box">
                        <FormControl fullWidth>
                            <InputLabel id={`station${i}`}>Station {i}</InputLabel>
                            <Select
                                labelId={`station${i}`}
                                id={`station${i}`}
                                value={stationsStop[i] ? stationsStop[i].id : -1}
                                label={`station${i}`}
                                onChange={(event) => {
                                    console.log(i);
                                    let kek = [...stationsStop]
                                    kek[i] = {id: event.target.value}
                                    setStationsStop(kek)
                                    console.log(event.target.value)
                                }}
                            >
                                {stations &&
                                stations.size !== 0 &&
                                stations
                                    .map((station) => (
                                        <MenuItem key={station.id} value={station.id}>{station.name}</MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                        <div className="btn-box">
                            {stationsStop.length !== 0 && <button
                                className="mr10"
                                onClick={() => handleRemoveClick(i)}>Remove</button>}
                        </div>
                    </div>
                );
            })}
            <div className="btn-box">
                {<button onClick={handleAddClick}>Add</button>}
            </div>
            <div style={{marginTop: 20}}>{JSON.stringify(stationsStop)}</div>
        </div>
    );
}