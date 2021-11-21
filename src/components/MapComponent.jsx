import React from 'react'
import {Map, PathLayer, Path, CompassControl, KeyboardControl, MouseControl, MarkerLayer, Marker} from 'react-mapycz'

export const MapComponent = ({center, markers, trainPath, separatePaths, zoom = 12, width = "1230px", height="600px"}) => (
    <Map width={width} height={height} center={center} zoom={zoom}>
        <CompassControl/>
        <KeyboardControl/>
        <MouseControl zoom={true} wheel={true} pan={true}/>
        <PathLayer>
            {trainPath && <Path width={5} coords={trainPath} dynamicRoute={false} options={{color: "black"}} />}
            {separatePaths && separatePaths.map((separatePath) => (
                <Path key={separatePath.id} width={5} coords={separatePath} dynamicRoute={false} options={{color: "black"}} />
                )
            )}
        </PathLayer>
        <MarkerLayer>
            {markers.map((marker) => (
                <Marker coords={marker}/>
                )
            )}
        </MarkerLayer>
    </Map>
)