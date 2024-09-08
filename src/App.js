import './App.css';
import { useEffect, useState } from "react";
import propTypes from "prop-types";

import searchicon from "./assets/searchicon img.png";
import search from "./assets/search img.png";
import cloud from "./assets/cloud img.png";
import drizzle from "./assets/drizzle img.png";
import humidity from "./assets/humidity img.png";
import rain from "./assets/rain img.png";
import snow from "./assets/snow img.png";
import sun from "./assets/sun img.png";
import wind from "./assets/wind img.png";




const WeatherDetails = ({icon,temp,city,country,lat,log,humidity1,wind2}) =>{
 return (
  <>
  <div className="image" >
    <img src={icon} alt="Image"/>
 </div>
 <div className='temp'>{temp}°C</div>
 <div className='location'>{city}</div>
 <div className='country'>{country}</div>
 <div className='cord'>
  <div>
    <span className='lat'>latitude</span>
    <span>{lat}</span>
  </div>
  <div>
    <span className='log'>longitude</span>
    <span>{log}</span>
  </div>
</div>
<div className='data-container'>
  <div className='element'>
    <img src={humidity} alt='humidity' className='icon'></img>
    <div className='data'>
      <div className='humidity-percent'>{humidity1}%</div>
      <div className='text'>Humidity</div>
    </div>
  </div>
  <div className='element'>
    <img src={wind} alt='wind' className='icon'></img>
    <div className='data'>
      <div className='wind-percent'>{wind2} km/h</div>
      <div className='text'>Wind-Speed</div>
    </div>
  </div>
</div>
</>
 );
};

WeatherDetails.propTypes ={
  icon:propTypes.string.isRequired,
  temp:propTypes.number.isRequired,
  city:propTypes.string.isRequired,
  country:propTypes.string.isRequired,
  humidity1:propTypes.number.isRequired,
  wind2:propTypes.number.isRequired,
  lat:propTypes.number.isRequired,
  log:propTypes.number.isRequired,
};
function App() {
  let api_key="5a17b1d4d8f6ed03646cc778a5e157c0";
  const[text,setText]=useState("Madurai")
  let [icon, setIcon] = useState(sun);
  const [temp,setTemp] = useState(0);
  const [city,setCity] = useState("Madurai");
  const [country,setCountry] = useState("IN");
  const [lat,setLat] = useState(0);
  const [log,setLog] = useState(0); 
  const [humidity,setHumidity] = useState(0);
  const [wind,setWind] = useState(0);
  const[citynotfound,setcityNotfound]=useState(false);
  const[loading,setLoading]=useState(false);
  const[error,setError]=useState(null);
  

  const weatherIconMap ={
    "01d":sun,
    "01n":sun,
    "02d":cloud,
    "02n":cloud,
    "03d":drizzle,
    "03n":drizzle,
    "04d":drizzle, 
    "04n":drizzle,
    "09d":rain, 
    "09n":rain,
    "10d":rain,
    "10n":rain,
    "13d":snow,
    "13n":snow,
    }


  const Search=async()=>{
    setLoading(true);
    
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
    try{
      let res = await fetch(url);
      let data= await res.json();
      // console.log(data);
      if(data.cod ==="404"){
        console.error("city not found");
        setcityNotfound(true);
        setLoading(false);
        return;
      }
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLog(data.coord.lon)
      const weatherIconcode=data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconcode] || sun);
      citynotfound(false);
    }catch(error){
      console.error("An error occured:",error.message)
      setError("An error occurred while fetching weather data.");

    }finally{
      setLoading(false);
    }
  
  }

  const handleCity=(e)=>{
    setText(e.target.value);

  };
  const handlekeydown=(e)=>{
    if(e.key === "Enter"){
      Search();
    }
  }
  useEffect(function (){
    Search();
  },[])
  
  return (
    <>
    <div className="container">
      <div className="input-container">
        <input type="text" className="cityInput" placeholder="Search City" onChange={handleCity} value={text}
         onKeyDown={handlekeydown}></input>
        <div className="search" onClick={()=>Search()}>

<img src={search} alt="search"/>

        </div>
       </div>
      
     { loading && <div className='loading-message'>Loading...</div>}
      { error && <div className='error-message'>{}</div>}
     {citynotfound && <div className='city-not-found'>City not found</div>}

     {!loading && !citynotfound &&<WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity1={humidity} wind2={wind}/>}
      <p className='copyright'>Designed by <span>Premnath</span></p>
     
       </div>
    </>
  );
}

export default App;
