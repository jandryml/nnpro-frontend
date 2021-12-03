import React from 'react'
import {Map, PathLayer, Path, CompassControl, KeyboardControl, MouseControl, MarkerLayer, Marker} from 'react-mapycz'

export const MapComponent = ({center={lat: 49.8, lng: 15.45}, markers, dynamic = false, separatePaths, zoom = 8, width = "1230px", height="600px"}) => (
    <Map width={width} height={height} center={center} zoom={zoom}>
        <CompassControl/>
        <KeyboardControl/>
        <MouseControl zoom={true} wheel={true} pan={true}/>
        <PathLayer>
            {separatePaths && separatePaths.map((separatePath) => (
                <Path key={separatePath.id} width={5} coords={separatePath} dynamicRoute={dynamic} options={ dynamic ? {color: "blue"} : {color: "black"}} />
                )
            )}
        </PathLayer>
        <MarkerLayer>
            {markers.map((marker) => (
                <Marker key={marker.id} coords={marker}/>
                )
            )}
        </MarkerLayer>
    </Map>
)