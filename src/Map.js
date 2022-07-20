import { GoogleMap, Marker } from '@react-google-maps/api';
import { Wrapper } from '@googlemaps/react-wrapper';
import './Map.css';
// import { useState } from 'react';

export const Map = ({ position, setPosition, pressedMap, setPressedMap, originalPosition, showResult }) => {
    // console.log(text)
    // const Map = ({ position }) => {
    const MapsKey = process.env.REACT_APP_MAPS_API
    // const [position, setPosition] = useState({ lat: 43.238949, lng: 76.889709 })

    const handleMapClick = (event) => {
        // console.log(event.latLng)
        // console.log(event.latLng)
        setPressedMap(true)
        setPosition(event.latLng)
    }

    const containerStyle = {
        width: '48vw',
        height: '95vh'
    };
    const defaultMapOptions = {
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: true,
        keyboardShortcuts: false,
        draggableCursor: 'crosshair',
        minZoom: 2,
        maxZoom: 18
    };
    return (
        <div className='map'>
            <Wrapper apiKey={MapsKey}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    // center={undefined}
                    center={position}
                    zoom={0}
                    clickableIcons={false}
                    draggable={true}
                    options={defaultMapOptions}
                    onClick={handleMapClick}
                    mapTypeId={'terrain'}
                >
                    <Marker visible={pressedMap ? true : false} cursor={'crosshair'} position={position}></Marker>
                    <Marker visible={showResult ? true : false} cursor={'crosshair'} position={originalPosition}></Marker>
                </GoogleMap>
            </Wrapper>
        </div >
    );
}