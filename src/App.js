import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

import './Estilo/estilo.css'




import './App.css';

function App() {

  const [location, setLocation] = useState();
  const [weather, setWeather] = useState(false);

  let getWeather = async (lat, long) => {


    let res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WHEATER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    });
    setWeather(res.data);
    console.log(res.data);

  }


  useEffect(() => {

    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true);
    })

  }, [])


  if (!location) {

    return (

      <Fragment>
        <div className='content'>
          <h3>Autorize a sua Localização!</h3>
        </div>
      </Fragment>



    );
  }
  else if (weather === false) {
    return (
      <Fragment>
        <div className="content">
          <h3>Carregando previsao do tempo...</h3>
        </div>
      </Fragment>
    );
  }
  else {
    return (

      <Fragment>
        <div className='content'>
          <h3>Clima na sua cidade: {weather['weather'][0]['description']}</h3>
          <hr />
          <ul>
            <li>Temperatura atual: {weather['main']['temp']}°C</li>
            <li>Temperatura maxima: {weather['main']['temp_max']}°C</li>
            <li>Temperatura minima: {weather['main']['temp_min']}°C</li>
            <li>Pressão:  {weather['main']['pressure']} hpA</li>
            <li>Humidade: {weather['main']['humidity']}%</li>

          </ul>

          <div>
            <span>2021 pixeloko studio</span>
          </div>
        </div>
      </Fragment>


    );
  }



}

export default App;
