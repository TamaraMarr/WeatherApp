import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, } from "react-google-maps";

export const MapWithAMarker = withScriptjs(withGoogleMap(props =>{
   return( <GoogleMap
        defaultZoom={8}
        center={{lat: props.center.lat, lng: props.center.lng}}
    >
        <Marker
            position={{ lat: props.center.lat, lng: props.center.lng }}
        />
    </GoogleMap>);

}
));