function getMarkers(stations) {
    let markers = [];
    for (const station of stations) {
        markers = [...markers, {lat: station.x, lng: station.y}]
    }
    return markers;
}

function getRails(rails) {
    let separatePaths = []
    for (let i = 0; i < rails.length; i++) {
        separatePaths = [...separatePaths, [{
            id: i,
            lat: rails[i].sourceStation.x,
            lng: rails[i].sourceStation.y
        }, {id: i, lat: rails[i].targetStation.x, lng: rails[i].targetStation.y}]]
    }
    return separatePaths;
}

function getRoutesBetween(stations) {
    let separatePaths = []

    for (let i = 0; i < stations.length - 1; i++) {
        separatePaths = [...separatePaths, [{
            id: i,
            lat: stations[i].x, lng: stations[i].y
        }, {id: i, lat: stations[i + 1].x, lng: stations[i + 1].y}]]
    }
    return separatePaths;
}

export {getMarkers, getRails, getRoutesBetween}