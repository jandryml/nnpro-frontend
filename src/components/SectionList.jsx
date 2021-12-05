import React, {useLayoutEffect, useState} from 'react'
import {ListItem, ListItemSecondaryAction, ListItemText, RootRef} from "@material-ui/core";
import {getAllStations} from "../data-service/StationDataService";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import {StationsFiltered} from "./StationsFiltered";
import Button from "@material-ui/core/Button";

export const SectionList = ({routeNode, setRouteNode}) => {

    const [stations, setStations] = useState([]);
    const [filteredStation, setFilteredStation] = useState([])
    const [selectedStation, setSelectedStation] = useState([])

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
        ...draggableStyle,
        ...(isDragging && {
            background: "rgb(235,235,235)"
        })
    });

    const onDragEnd = (result) => {
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

    const getFilteredStations = (data, round) => {
        return data.filter((station) => isAlreadyChosen(round, station))
    }

    const isAlreadyChosen = (round, station) => {
        return round.filter((element) => station.id === element.stationId).length === 0
    }

    useLayoutEffect(() => {
        getAllStations().then((data) => {
            setStations(data)
            setFilteredStation(getFilteredStations(data, routeNode))
        })
    }, [])

    const handleAddClick = () => {
        const list = [...routeNode];
        list.push({stationId: selectedStation})
        list.map((element, index) => element.order = index)
        setRouteNode(list);
    };

    const getStation = (stationId) => {
        if (stationId && stations && stations.length !== 0) {
            return stations.filter((cmp) => cmp.id === stationId)[0]?.name
        } else {
            return null
        }
    }

    return (
        <div className="container">
            <h3>Train station stops</h3>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <RootRef rootRef={provided.innerRef}>
                            <List>
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
                                                {getStation(item.stationId) &&
                                                    <ListItemText
                                                        primary={getStation(item.stationId)}
                                                        secondary={"order: " + item.order}
                                                    />
                                                }
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
            {routeNode && routeNode.length !== 0 &&
                <div className="container-flex">
                    <StationsFiltered stations={filteredStation} selectedStation={selectedStation}
                                      setSelectedStation={setSelectedStation}/>
                </div>
            }
            <div className="btn-box">
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth={true}
                    onClick={handleAddClick}
                >
                    Add
                </Button>
            </div>
        </div>
    );
}
