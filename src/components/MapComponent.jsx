import React from 'react'
import {Map, PathLayer, Path, CompassControl, KeyboardControl, MouseControl, MarkerLayer, Marker} from 'react-mapycz'

export const MapComponent = ({center, markers, trainPath}) => (
    <Map width="1230px" height="600px" center={center} zoom={12}>
        <CompassControl/>
        <KeyboardControl/>
        <MouseControl zoom={true} wheel={true} pan={true}/>
        <PathLayer>
            {trainPath && <Path width={5} coords={trainPath} dynamicRoute={false} options={{color: "black"}} />}
        </PathLayer>
        <MarkerLayer>
            {markers.map((marker) => (
                <Marker coords={marker}/>
                )
            )}
        </MarkerLayer>
    </Map>
)