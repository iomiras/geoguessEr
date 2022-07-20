import { GoogleMap, Marker } from '@react-google-maps/api';
import { Wrapper } from '@googlemaps/react-wrapper';

export const Map = ({ position }) => {
    // console.log(text)
    // const Map = ({ position }) => {
    const MapsKey = process.env.REACT_APP_MAPS_API

    const containerStyle = {
        width: '48vw',
        height: '95vh'
    };

    const defaultMapOptions = {
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        minZoom: 2,
        maxZoom: 18
    };

    return (
        <div className='map'>
            <Wrapper apiKey={MapsKey}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={position}
                    zoom={0}
                    clickableIcons={false}
                    draggable={true}
                    options={defaultMapOptions}
                >


                    <Marker position={position}></Marker>

                </GoogleMap>
            </Wrapper>
        </div>
    );
}