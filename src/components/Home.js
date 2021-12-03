import {MapComponent} from "./MapComponent";
import {useEffect, useState} from "react";
import {getAllStations} from "../data-service/StationDataService";
import {getAllRails} from "../data-service/RailDataService";
import {getMarkers, getRails} from "./MapDataParser";

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

    return (
        <div>
            <center><h1>Welcome to incident resolver</h1></center>
            <MapComponent markers={getMarkers(stations)} separatePaths={getRails(rails)}  height={"750px"}/>
        </div>
    );
};

export default Home;
