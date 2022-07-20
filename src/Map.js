import { GoogleMap, Marker } from '@react-google-maps/api';
import { Wrapper } from '@googlemaps/react-wrapper';
import Rick from './markers/rick26.png'
import Morty from './markers/morty26.png'
import './Map.css';
// import { useState } from 'react';

export const Map = ({ position, setPosition, pressedMap, setPressedMap, originalPosition, showResult }) => {
    const MapsKey = process.env.REACT_APP_MAPS_API

    const handleMapClick = (event) => {
        setPressedMap(true)
        setPosition(event.latLng)
    }

    // console.log(document.getElementsByTagName('body')[0].clientWidth);

    const containerStyle = {
        width: '48vw',
        height: '95vh'
    };

    const containerStyleForDesktop = {
        width: '48vw',
        height: '95vh'
    };

    const containerStyleForMobile = {
        width: '95vw',
        height: '48vh'
    };

    const defaultMapOptions = {
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: true,
        keyboardShortcuts: false,
        draggableCursor: 'crosshair',
        minZoom: 2,
        maxZoom: 18,
        borderRadius: '30px'
    };
    return (
        <div className='map'>
            <Wrapper apiKey={MapsKey}>
                <GoogleMap
                    mapContainerStyle={document.getElementsByTagName('body')[0].clientWidth > 600 ? containerStyleForDesktop : containerStyleForMobile}
                    center={position}
                    zoom={0}
                    clickableIcons={false}
                    draggable={true}
                    options={defaultMapOptions}
                    onClick={handleMapClick}
                    mapTypeId={'terrain'}
                >
                    <Marker icon={{ url: Morty }} visible={pressedMap ? true : false} cursor={'crosshair'} position={position}></Marker>
                    <Marker icon={{ url: Rick }} visible={showResult ? true : false} cursor={'crosshair'} position={originalPosition}></Marker>
                </GoogleMap>
            </Wrapper>
        </div >
    );
}