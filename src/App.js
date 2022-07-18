import './App.css';
import cities from 'cities.json';
import axios from 'axios';
import { useEffect, useState } from 'react';
// let res = cities.values()

function App() {
  const [randomCity, setRandomCity] = useState([])
  const [coords, setCoords] = useState([])
  const [userInput, setUserInput] = useState('')
  const [infoAboutCity, setInfoAboutCity] = useState({ localtime: '', temp_c: '', desc: '', uv: '' })
  const [result, setResult] = useState(false)

  const handleInputChange = (event) => {
    setUserInput(event.target.value)
  }

  function getCity() {
    setRandomCity(cities[Math.floor(Math.random() * cities.length)])
    setResult(false)
  }

  function handleCheck() {
    setResult(userInput.toLowerCase() === coords[3].toLowerCase())
    setUserInput('')
  }

  function handleGetHints() {
    if (coords[3]) {
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
    console.log(randomCity)
    if (randomCity.length !== 0) {
      let config = {
        method: 'get',
        url: `https://geocode.xyz/${randomCity.name}?json=1`,
        // auth=150366775057454160900x98081
      };

      axios(config)
        .then(function (response) {
          console.log(response)
          setCoords([response.data.longt, response.data.latt, response.data.standard.countryname, response.data.standard.city])
          setInfoAboutCity({ localtime: '', temp_c: '', desc: '', uv: '' })
        })
        .catch(function (error) {
          console.warn(error.response.data.error.message)
        });
    }
  }, [randomCity]);

  return (
    <>
      <div className='app'>
        <div className={coords.length === 0 ? 'main-part-wrapper disable' : 'main-part-wrapper'}>
          <div id='desc-wrapper'>
            <h3 class='text'>{coords[2]}</h3>
            <h4 class='text'>{coords[3]}</h4>
            <p class='text'>long = {coords[0]}</p>
            <p class='text'>latt = {coords[1]}</p>
            <p class='text'>localtime = {infoAboutCity.localtime}</p>
            <p class='text'>temp_c = {infoAboutCity.temp_c}</p>
            <p class='text'>desc = {infoAboutCity.desc}</p>
            <p class='text'>uv = {infoAboutCity.uv}</p>
          </div>

          <div className='give-hint-wrapper'>
            <button onClick={handleGetHints} type="submit">Give me a hint</button>
          </div>
        </div>

        <div id='int-area'>
          <button onClick={getCity} type="submit">Get city</button>
          <input onChange={handleInputChange} value={userInput}></input>
          <button onClick={handleCheck} type="submit">Check my guess</button>
        </div>

        <h3 className={result ? 'enable' : 'disable'}>you are right</h3>
      </div >
      <div className='map'></div>
    </>
  );
}

export default App;