import { GoogleMap, Marker } from '@react-google-maps/api';
import { Wrapper } from '@googlemaps/react-wrapper';

export const Map = ({ position, setPosition }) => {
    // console.log(text)
    // const Map = ({ position }) => {

    const MapsKey = process.env.REACT_APP_MAPS_API
    // const [position, setPosition] = useState({ lat: 43.238949, lng: 76.889709 })

    const handleMapClick = (event) => {
        // console.log(event.latLng)
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
        minZoom: 2,
        maxZoom: 18
    };

    return (
        <div className='map'>
            <Wrapper apiKey={MapsKey}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={undefined}
                    zoom={0}
                    clickableIcons={false}
                    draggable={true}
                    options={defaultMapOptions}
                    onClick={handleMapClick}
                    mapTypeId={'terrain'}
                >


                    <Marker position={position}></Marker>

                </GoogleMap>
            </Wrapper>
        </div>
    );
}

// import { GoogleMap, Marker } from '@react-google-maps/api';
// import { Wrapper } from '@googlemaps/react-wrapper';
// // import { useState } from 'react';

// export const Map = ({ position, setPosition }) => {
//     // console.log(text)
//     // const Map = ({ position }) => {

//     const MapsKey = process.env.REACT_APP_MAPS_API
//     // const [position, setPosition] = useState({ lat: 43.238949, lng: 76.889709 })

//     const handleMapClick = (event) => {
//         console.log(event.latLng)
//         setPosition(event.latLng)
//     }

//     const containerStyle = {
//         width: '48vw',
//         height: '95vh'
//     };

//     const defaultMapOptions = {
//         fullscreenControl: false,
//         mapTypeControl: false,
//         streetViewControl: false,
//         zoomControl: true,
//         minZoom: 2,
//         maxZoom: 18
//     };

//     return (
//         <div className='map'>
//             <Wrapper apiKey={MapsKey}>
//                 <GoogleMap
//                     mapContainerStyle={containerStyle}
//                     center={undefined}
//                     zoom={0}
//                     clickableIcons={false}
//                     draggable={true}
//                     options={defaultMapOptions}
//                     onClick={handleMapClick}
//                     mapTypeId={'terrain'}
//                 >


//                     <Marker position={position}></Marker>

//                 </GoogleMap>
//             </Wrapper>
//         </div>
//     );
// }