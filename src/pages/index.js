import React, { useState } from "react";
import axios from "axios";



const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [country, setCountry] = useState('')    
  const [currency, setCurrency] = useState(null)


  const handleSubmit = async (e) => {
    e.preventDefault();
    const API_KEY = "dc5b6e1c960b9866ca64458c8082730e";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await axios.get(url);
    setWeatherData(response.data);
  };



  const handleSubmit1 = async (l) => {
    l.preventDefault()

    const url1 = `https://openexchangerates.org/api/latest.json?app_id=b268eb291ddf4c8db383c29953c1b17b&symbols=${country}`

    try {
      const response = await axios.get(url1)
      setCurrency(response.data)
    } catch (error) {
      console.error(error)
      setCurrency(null)
    }
  }

  const handleChange1 = (l) => {
    setCountry(l.target.value)
  }


  return (
    <div>
      <h1 className=" head">Currency and Weather Details</h1>
       <h2 className="line" >Currency Details</h2>
         <form onSubmit={handleSubmit1}>
           <label><b>Enter country name :</b>
             <input placeholder="ex:INR" type="text" value={country} onChange={handleChange1} />
           </label>
           <button type="submit">Get Value</button>
         </form>
        {currency && (
          <div>
             <h4>Base :{currency.base}</h4>
             <p>Value: {currency.rates[country]}</p>
          </div>
        )
    }
    <h2 className="line" >Weather Details</h2>
      <form onSubmit={handleSubmit}>
        <label><b>Enter the City or Country Name :</b></label>
        <input
          placeholder="ex:london"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>
      {weatherData && (
        <div>
          {weatherData.list.map((data, index) => (
            <div className="border" key={index}>
              
              <p>Date: {data.dt_txt}</p>
              <p>Temperature: {data.main.temp}°C</p>
              <p>Description: {data.weather[0].description}</p>
            </div>
          ))}
        </div>
      )}
      <footer className="foot">Created By Avin Dsouza</footer>
    </div>
  );
};

export default Weather;
