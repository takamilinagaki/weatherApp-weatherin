import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css"
import Footer from "@/components/Footer";

import arrow from "../../public/arrow.svg"
import cityIcon from "../../public/cityIcon.svg"


export default function Home() {

  const [city, setCity] = useState<string>("");
  const [currentData, setCurrentData] = useState<ICurrentProps | null>(null);
  const [forecastData, setForecastData] = useState<IForecastProps[] | null>(null);

  var apiKey = '33a008b53b04cb2850e9a63e018ab054';
  var currentWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  var forecastWeatherUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  var options: Intl.DateTimeFormatOptions = {month: 'long', day: 'numeric', year: 'numeric'}

  const GrabCurrentInfo = () => {
    fetch(currentWeatherUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setCurrentData(data);
      setCity("");
    })
    .catch((error) => {
      console.log("", error);
      setCurrentData(null)
    })
  }

  const GrabForecastInfo = () => {
    fetch(forecastWeatherUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setForecastData([
        data.list[0],
        data.list[8],
        data.list[16],
        data.list[24],
        data.list[32],
      ]);
      setCity("");
    })
    .catch((error) => {
      console.log("", error);
      setCurrentData(null)
    })
  }

  const handleButtonClick = () => {
    if(!city) {
      console.log('Enter another City or Country');
      return;
    }
    GrabCurrentInfo();
    GrabForecastInfo();
  }

  const weatherImage = (description: string) => {
    switch (description) {
      case 'Clear':
          return '/sunnyIcon.svg';

          case 'Clouds':
            return '/cloudyIcon.svg';
  
            case 'Rain':
              return '/rainyIcon.svg';
    
              case 'Snow':
                return '/snowIcon.svg';
    
      default:
        return '';
    }
  }
  return (
    <main className={styles.main}>
        <div>
          <div className={styles.green}></div>
          <div className={styles.pink}></div>
          <h1 className={styles.title}>Check the weather</h1>
          <h2 className={styles.subTitle}>Enter city or country name</h2>
            <div className={styles.inputSection}>
              <input
                className={styles.cityInput}
                onChange={(e) => setCity(e.target.value)}
                placeholder="type in..."></input>
              <button
                className={styles.submitButton}
                onClick={handleButtonClick}>Check the weather
                <Image 
                 className={styles.arrow}
                  src={arrow}
                  alt=""/></button>
              </div>
        </div>

          {/* result */}

    <div className={styles.resultSection}>  
        {currentData ? (
          <div className={styles.topSection}>
            <div className={styles.topSectionTexts}>
              <h3 className={styles.resultTitle}>Weather of</h3>
                <div className={styles.cityNameSection}>             
                   <Image 
                    src={cityIcon}
                    alt=""
                    width={32}
                    height={25}/>
                   <h4 className={styles.cityName}>{currentData.name}</h4>
                </div>
            </div>
            {currentData && (
              <div className={styles.currentTopSection}>
               <h5 className={styles.currentTitle}>Current<br/>Weather:</h5>
                <div className={styles.currentTopSectionMain}>
                  <Image 
                    src={weatherImage(currentData.weather[0].main)}
                    alt=""
                    height={170}
                    width={170}
                    />
                  <p className={styles.currentWeatherDescription}>{currentData.weather[0].main}</p>
                 </div>
                  <div className={styles.currentWeatherDetails}>
                    <p className={styles.currentWeatherTemp}>{(currentData.main.temp - 273.15).toFixed(1)}°C</p>
                    <p className={styles.currentWeatherSpeed}>{currentData.wind.speed}km/h</p>
                  </div>
              </div>
            )}
          </div>
          ) : null 
        }

        {forecastData && (
          <div>
           <h6  className={styles.forecastWeatherTitle}>5 days forecast</h6>
           <div className={styles.forecastWeatherSections}>
              {forecastData.map((data, index) => (
                <div 
                  key={index}
                  className={styles.forecastWeatherSection}>
                  <Image 
                    className={styles.forecastWeatherImage}
                    src={weatherImage(data.weather[0].main)}
                    alt=""
                    width={90}
                    height={90}/>
                    <p className={styles.forecastWeatherDescription}>{data.weather[0].main}</p>
                    <p className={styles.forecastWeatherTemp}>{(data.main.temp - 273.15).toFixed(1)}°C</p>
                    <p className={styles.forecastWeatherSpeed}>{(data.wind.speed)}km/h</p>
                    <p className={styles.forecastWeatherDate}>{new Date(data.dt_txt).toLocaleDateString("en-US",options)}</p>
                </div>
              ))}
           </div>
        </div>
            )}
    </div> 

    <div style={{
      backgroundColor: '#F5F5F5',
      paddingBottom: '50px',
      paddingTop: '30px'
    }}>
      <Footer />
    </div>
    </main>
  );
}
