import {MapComponent} from "./MapComponent";
import {useEffect, useState} from "react";
import {getAllStations} from "../data-service/StationDataService";
import {getAllRails} from "../data-service/RailDataService";

const Home = ({user}) => {
    const [stations, setStations] = useState([]);
    const [rails, setRails] = useState([]);

    useEffect(() => {
        getAllStations().then((data) => {
            setStations(data);
        });

        getAllRails().then((data) => {
            setRails(data);
        });
    }, []);

    function getMarkers() {
        let markers = [];
        for (const station of stations) {
            markers = [...markers, {lat: station.x, lng: station.y}]
        }
        return markers;
    }

    function getRails() {
        let separatePaths= []
        for (let i = 0; i < rails.length; i++) {
            separatePaths = [...separatePaths, [{id: i,lat: rails[i].sourceStation.x, lng: rails[i].sourceStation.y}, {id: i, lat: rails[i].targetStation.x, lng: rails[i].targetStation.y}]]
        }
        return separatePaths;
    }

    return (
        <div>
            <center><h1>Welcome to incident resolver</h1></center>
            <MapComponent center={{lat: 49.8, lng: 15.45}} markers={getMarkers()} separatePaths={getRails()} zoom={8} height={"750px"}/>
        </div>
    );
};

export default Home;
