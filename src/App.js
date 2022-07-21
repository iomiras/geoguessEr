// /* global google */
// /* eslint-disable no-undef */
import './App.css';
import React from 'react';
import { capitals } from './capitals';
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
  const [answered, setAnswered] = useState(true)
  const [distance, setDistance] = useState(0)
  const [showRules, setShowRules] = useState(true)
  const isDesktop = document.getElementsByTagName('body')[0].clientWidth > 600 //true is a desktop. false is a mobile

  function getCity() {
    setRandomCity(capitals[Math.floor(Math.random() * capitals.length)])
    setResult(false)
    setShowResult(false)
    setAskedHint(false)
    setPressedMap(false)
    setAnswered(false)
    setShowRules(false)
  }

  function handleCheck() {
    let d = getDistance(position, originalPosition) / 1000
    setDistance(parseFloat(d.toFixed(3)))
    if (d < 20) {
      setResult(true)
    } else setResult(false)
    setShowResult(true)
    setAnswered(true)
    setAskedHint(false)
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
      console.log(randomCity.CountryName)
      parseFloat(parseFloat(randomCity.CapitalLatitude).toFixed(2))

      setCoords([parseFloat(parseFloat(randomCity.CapitalLongitude).toFixed(2)),
      parseFloat(parseFloat(randomCity.CapitalLatitude).toFixed(2)),
      randomCity.CountryName,
      randomCity.CapitalName])
      setInfoAboutCity({ localtime: '', temp_c: '', desc: '', uv: '' })
      setOriginalPosition({ lat: parseFloat(randomCity.CapitalLatitude), lng: parseFloat(randomCity.CapitalLongitude) })
    }
  }, [randomCity]);

  return (
    <div className='all'>
      <div className='app'>
        <div className={coords.length === 0 ? 'main-part-wrapper disable' : 'main-part-wrapper'}>
          <div id='desc-wrapper'>
            {/* <h3 className='text'>{coords[2]}</h3>
            <h4 className='text'>{coords[3]}</h4> */}
            <div>
              <p className='text'>Longitude↔ = <b> {coords[0]} </b></p>
              <p className='text'>Latitude↕ = <b> {coords[1]} </b></p>
            </div>
            <div className={askedHint ? 'enable' : 'disable'}>
              <p className='text hint'>Local time🕰 = <b> {infoAboutCity.localtime} </b></p>
              <p className='text hint'>Temperature🌡️ = <b> {infoAboutCity.temp_c}°C </b></p>
              <p className='text hint'>Weather🌤 = <b> {infoAboutCity.desc} </b></p>
              <p className='text hint'>UV index🌞 = <b> {infoAboutCity.uv} </b></p>
            </div>
          </div>

          <div className='give-hint-wrapper'>
            <button id='hint-button' onClick={handleGetHints} type="submit">Give me a hint 💡</button>
          </div>
        </div>

        <div id='int-area'>
          <button className={answered ? 'enable' : 'disable'} onClick={getCity} type="submit">Generate {showResult ? 'another' : ''} city 🌏</button>
          <p className={!answered && !pressedMap && isDesktop ? 'text enable' : 'text disable'} >Mark the city on the map 👉</p>
          <p className={!answered && !pressedMap && !isDesktop ? 'text enable' : 'text disable'} >Mark the city on the map 👇</p>
          <button className={!answered && pressedMap ? 'enable' : 'disable'} onClick={handleCheck} type="submit">Check my guess ✅</button>
        </div>
        <p className={showRules && !showResult ? 'enable rule text' : 'disable rule text'}>You have to guess the capital city by its description and mark it on the map</p>

        <div className={showResult ? 'enable text result' : 'result disable text'}>
          <h4>You are <span className={result ? 'right' : 'wrong'}>{result ? 'right' : 'wrong'}!</span> <span className='capital'>{coords[3]}</span> is the capital of <span className='country'> {coords[2]}</span>.</h4>
          <h4 className={result ? 'disable' : 'enable'}>Your guess was <span className='capital'>{distance} KM</span> from the correct location.</h4>
        </div>
      </div >
      <Map position={position} setPosition={setPosition} pressedMap={pressedMap} setPressedMap={setPressedMap} originalPosition={originalPosition} showResult={showResult} answered={answered} setAnswered={setAnswered} />
    </div >
  );
}

export default App;