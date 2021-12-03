import React, {useEffect, useState} from 'react'
import {
    FormControl,
    InputLabel,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    MenuItem,
    RootRef,
    Select
} from "@material-ui/core";
import {getAllStations} from "../data-service/StationDataService";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Button from "@material-ui/core/Button";

export const SectionList = ({routeNode, setRouteNode}) => {

    const [stations, setStations] = useState([]);

    const handleRemoveClick = index => {
        const list = [...routeNode];
        list.splice(index, 1);
        list.map((element, index) => element.order = index)
        setRouteNode(list);
    };

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        result.map((element, index) => element.order = index)
        return result
    };

    const getItemStyle = (isDragging, draggableStyle) => ({
        // styles we need to apply on draggables
        ...draggableStyle,

        ...(isDragging && {
            background: "rgb(235,235,235)"
        })
    });

    const getListStyle = isDraggingOver => ({
        //background: isDraggingOver ? 'lightblue' : 'lightgrey',
    });

    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }
        setRouteNode(reorder(
                routeNode,
                result.source.index,
                result.destination.index
            )
        )
    }

    const isAlreadyChosen = (station) => {
        console.log(station.name)
        console.log("Kolín")
        return routeNode.filter((routeNode)=> station.name === "Kolín")
    }

    useEffect(() => {
        getAllStations().then((data) => {
            setStations(data)
        })
    }, [routeNode])

    const handleAddClick = () => {
        setRouteNode([...routeNode, {stationId: -1}]);
    };

    const getStation = (stationId) => {
        if (stationId && stations && stations.length !== 0) {
            return stations.filter((cmp) => cmp.id === stationId)[0]?.name
        } else {
            return ""
        }
    }

    return (
        <div className="container">
            <h3>Train station stops</h3>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <RootRef rootRef={provided.innerRef}>
                            <List style={getListStyle(snapshot.isDraggingOver)}>
                                {routeNode.map((item, index) => (
                                    <Draggable key={getStation(item.stationId)} draggableId={getStation(item.stationId)}
                                               index={index}>
                                        {(provided, snapshot) => (
                                            <ListItem
                                                ContainerComponent="li"
                                                ContainerProps={{ref: provided.innerRef}}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}
                                            >
                                                <ListItemText
                                                    primary={getStation(item.stationId)}
                                                    secondary={"order: " + item.order}
                                                />
                                                <ListItemSecondaryAction>
                                                    <IconButton onClick={() => handleRemoveClick(item.order)}>
                                                        <DeleteForeverIcon/>
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </List>
                        </RootRef>
                    )}
                </Droppable>
            </DragDropContext>
            {routeNode.map((x, i) => {
                return (
                    <div key={i} className="box" style={{"margin-top": "10px"}}>
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
                                    kek.map((element, index) => element.order = index)
                                    setRouteNode(kek)
                                }}
                            >
                                {stations &&
                                stations.size !== 0 &&
                                stations
                                    .filter((station) => isAlreadyChosen(station))
                                    .map((station) => (
                                        <MenuItem key={station.id} value={station.id}>{station.name}</MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                        <div className="btn-box" style={{"margin-top": "10px"}}>
                            {routeNode.length !== 0 && <button
                                className="mr10"
                                onClick={() => handleRemoveClick(i)}>Remove</button>}
                        </div>
                    </div>
                );
            })}
            <div className="btn-box">
                {<Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth={true}
                    onClick={handleAddClick}
                >
                    Add
                </Button>}
            </div>
            {/*<div style={{marginTop: 20}}>{JSON.stringify(routeNode)}</div>*/}
        </div>
    );
}
