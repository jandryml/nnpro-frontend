import React, {useEffect, useState} from 'react'
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {getAllStations} from "../data-service/StationDataService";

export const SectionList = ({routeNode, setRouteNode}) => {

    const [stations, setStations] = useState([]);

    const handleRemoveClick = index => {
        const list = [...routeNode];
        list.splice(index, 1);
        setRouteNode(list);
    };

    useEffect(() => {
        getAllStations().then((data) => {
            setStations(data)
        })
    }, [])

    const handleAddClick = () => {
        setRouteNode([...routeNode, {stationId: -1}]);
    };

    return (
        <div className="App" style={{"margin" :"60px 43%"}}>
            <h3>Train station stops</h3>
            {routeNode.map((x, i) => {
                return (
                    <div key={i} className="box" style={{"margin-top" :"10px"}}>
                        <FormControl fullWidth>
                            <InputLabel id={`station${i}`}>Station {i}</InputLabel>
                            <Select
                                labelId={`station${i}`}
                                id={`station${i}`}
                                value={routeNode[i] ? routeNode[i].stationId : -1}
                                label={`station${i}`}
                                onChange={(event) => {
                                    let kek = [...routeNode]
                                    kek[i] = {stationId: event.target.value}
                                    setRouteNode(kek)
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
                        <div className="btn-box" style={{"margin-top" :"10px"}}>
                            {routeNode.length !== 0 && <button
                                className="mr10"
                                onClick={() => handleRemoveClick(i)}>Remove</button>}
                        </div>
                    </div>
                );
            })}
            <div className="btn-box" style={{"margin-top" :"10px"}}>
                {<button onClick={handleAddClick}>Add</button>}
            </div>
            {/*<div style={{marginTop: 20}}>{JSON.stringify(routeNode)}</div>*/}
        </div>
    );
}