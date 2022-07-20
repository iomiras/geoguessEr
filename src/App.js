// /* global google */
// /* eslint-disable no-undef */
import './App.css';
import React from 'react';
import cities from 'cities.json';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Map } from './Map';
import { getDistance } from './getDistance';

function App() {
  const WeatherKey = process.env.REACT_APP_WEATHER_API


  const [randomCity, setRandomCity] = useState([]) //city that is being guessed
  const [coords, setCoords] = useState([]) // city's corrds + country name + city name
  const [infoAboutCity, setInfoAboutCity] = useState({ localtime: '', temp_c: '', desc: '', uv: '' }) // city's desc
  const [result, setResult] = useState(false) //verdict
  const [showResult, setShowResult] = useState(false) //if user has pressed 'check my answer'
  const [askedHint, setAskedHint] = useState(false) //if user has asked the hint
  const [pressedMap, setPressedMap] = useState(false) //if user has pressed the map
  const [position, setPosition] = useState({ lat: 0, lng: 0 }) //position of user's marker
  const [originalPosition, setOriginalPosition] = useState({ lat: 43.238949, lng: 76.889709 }) //position of original city's marker

  function getCity() {
    setRandomCity(cities[Math.floor(Math.random() * cities.length)])
    setResult(false)
    setShowResult(false)
    setAskedHint(false)
    setPressedMap(false)
  }

  function handleCheck() {
    let d = getDistance(position, originalPosition)
    if (d < 10000) {
      setResult(true)
    } else setResult(false)
    setShowResult(true)
  }

  function handleGetHints() {
    if (coords[3]) {
      setAskedHint(true)
      var config = {
        method: 'post',
        url: `https://api.weatherapi.com/v1/current.json?key=${WeatherKey}&q=${coords[1]},${coords[0]}`,
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
    if (randomCity.length !== 0) {
      let config = {
        method: 'get',
        url: `https://geocode.xyz/${randomCity.name}?json=1`,
      };

      axios(config)
        .then(function (response) {
          setCoords([response.data.longt, response.data.latt, response.data.standard.countryname, response.data.standard.city])
          setInfoAboutCity({ localtime: '', temp_c: '', desc: '', uv: '' })
          setOriginalPosition({ lat: parseFloat(response.data.latt), lng: parseFloat(response.data.longt) })
        })
        .catch(function (error) {
          console.log(error)
          console.error(error.response.data.error.message)
        });
    }
  }, [randomCity]);

  return (
    <div className='all'>
      <div className='app'>
        <div className={coords.length === 0 ? 'main-part-wrapper disable' : 'main-part-wrapper'}>
          <div id='desc-wrapper'>
            {/* <h3 className='text'>{coords[2]}</h3>
            <h4 className='text'>{coords[3]}</h4> */}
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
          <button onClick={handleCheck} type="submit">Check my guess</button>
        </div>

        <h3 className={showResult ? 'enable' : 'disable'}>you are {result ? 'right' : 'wrong'}. The city's name is {coords[3]}</h3>
      </div >
      <Map position={position} setPosition={setPosition} pressedMap={pressedMap} setPressedMap={setPressedMap} originalPosition={originalPosition} showResult={showResult} />
    </div >
  );
}

export default App;