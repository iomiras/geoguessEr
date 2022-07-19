// /* global google */
// /* eslint-disable no-undef */
import './App.css';
import React from 'react';
import cities from 'cities.json';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
// import UserChoice from './marker';
// let res = cities.values()

function App() {
  const [randomCity, setRandomCity] = useState([])
  const [coords, setCoords] = useState([])
  const [userInput, setUserInput] = useState('')
  const [infoAboutCity, setInfoAboutCity] = useState({ localtime: '', temp_c: '', desc: '', uv: '' })
  const [result, setResult] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [askedHint, setAskedHint] = useState(false)
  // const [position, setPosition] = useState({ lat: 43.238949, lng: 76.889709 })

  // const [marker, setMarker] = useState()

  // const google = window.google;

  const containerStyle = {
    width: '48vw',
    height: '95vh'
  };

  const center = {
    lat: 43.238949,
    lng: 76.889709
  };

  const position = {
    lat: 43.238949,
    lng: 76.889709
  };

  // var position = new window.google.maps.LatLng(-34.397, 150.644)

  const onLoad = marker => {
    console.log(marker)
    // setMarker(marker)
    // console.log('marker: ', marker)
    // console.log('marker: ', marker.position)
  }


  const defaultMapOptions = {
    fullscreenControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    minZoom: 0,
    maxZoom: 18
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value)
  }

  function getCity() {
    setRandomCity(cities[Math.floor(Math.random() * cities.length)])
    setResult(false)
    setShowResult(false)
    setAskedHint(false)
  }

  function handleCheck() {
    if (userInput.toLowerCase() === coords[3].toLowerCase()) {
      setResult(true)
      setUserInput('')
    } else setResult(false)
    setShowResult(true)
  }

  function handleGetHints() {
    if (coords[3]) {
      // console.log('position---- ', position)
      // console.log(marker)
      setAskedHint(true)
      var config = {
        method: 'post',
        url: `https://api.weatherapi.com/v1/current.json?key=774610bc93ad427ab0d54259220807&q=${coords[1]},${coords[0]}`,
        headers: {}
      };

      axios(config)
        .then(function (response) {
          setInfoAboutCity({ localtime: response.data.location.localtime, temp_c: response.data.current.temp_c, desc: response.data.current.condition.text, uv: response.data.current.uv })
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  useEffect(() => {
    // console.log(randomCity)
    if (randomCity.length !== 0) {
      let config = {
        method: 'get',
        url: `https://geocode.xyz/${randomCity.name}?json=1`,
        // auth=150366775057454160900x98081
      };

      axios(config)
        .then(function (response) {
          setCoords([response.data.longt, response.data.latt, response.data.standard.countryname, response.data.standard.city])
          setInfoAboutCity({ localtime: '', temp_c: '', desc: '', uv: '' })
          // setPosition({ lat: parseFloat(response.data.latt), lng: parseFloat(response.data.longt) })
        })
        .catch(function (error) {
          console.error(error.response.data.error.message)
        });
    }
  }, [randomCity]);

  return (
    <div className='all'>
      <div className='app'>
        <div className={coords.length === 0 ? 'main-part-wrapper disable' : 'main-part-wrapper'}>
          <div id='desc-wrapper'>
            <h3 className='text'>{coords[2]}</h3>
            <h4 className='text'>{coords[3]}</h4>
            <p className='text'>Longitude = <b> {coords[0]} </b></p>
            <p className='text'>Latitude = <b> {coords[1]} </b></p>
            <div className={askedHint ? 'enable' : 'disable'}>
              <p className='text'>Local time = <b> {infoAboutCity.localtime} </b></p>
              <p className='text'>Temperature = <b> {infoAboutCity.temp_c}°C </b></p>
              <p className='text'>Weather = <b> {infoAboutCity.desc} </b></p>
              <p className='text'>UV = <b> {infoAboutCity.uv} </b></p>
            </div>
          </div>

          <div className='give-hint-wrapper'>
            <button id='hint-button' onClick={handleGetHints} type="submit">Give me a hint</button>
          </div>
        </div>

        <div id='int-area'>
          <button onClick={getCity} type="submit">Get city</button>
          <input onChange={handleInputChange} value={userInput} type='text'></input>
          <button onClick={handleCheck} type="submit">Check my guess</button>
        </div>

        <h3 className={showResult ? 'enable' : 'disable'}>you are {result ? 'right' : 'wrong'}</h3>
      </div >
      {/* <Wrapper apiKey={"AIzaSyAF7mXLqb5GB5VINaURmUfnLjb753dfs2c"} render={render}>
      </Wrapper> */}
      <div className='map'>
        <LoadScript
          googleMapsApiKey="AIzaSyAF7mXLqb5GB5VINaURmUfnLjb753dfs2c"
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={0}
            clickableIcons={false}
            draggable={true}
            options={defaultMapOptions}
          >


            <Marker onLoad={onLoad} position={position}></Marker>

          </GoogleMap>
        </LoadScript>
      </div> {/* end of map element  */}
      {/* end of app element  =>*/}

      {/* <p style={{ font- size: 2px'}}><a href="https://www.flaticon.com/free-icons/marker" title="marker icons">Marker icons created by kmg design - Flaticon</a></p> */}
    </div >
  );
}

export default App;