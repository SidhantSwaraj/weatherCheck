import "./styles.css";
import { useState, useEffect } from "react";
import axios from "axios";

const Searchbar = ({ onSearch }) => {
  const [searchvalue, setSearchvalue] = useState("");
  const handleSearch = () => {
    onSearch(searchvalue);
  };

  return (
    <div className="searchbar">
      <input
        type="text"
        value={searchvalue}
        onChange={(e) => setSearchvalue(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

const WeatherCard = ({ title, value }) => {
  return (
    <div className="weathercard">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};

const Weather = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (city) {
      setLoading(true);
      axios
        .get(`https://api.weatherapi.com/v1/current.json`, {
          params: {
            key: "eaf35e1147d64c29a64101617240102",
            q: city,
          },
        })
        .then((res) => {
          setWeatherData(res.data);
        })
        .catch((err) => {
          console.error("Error fetching data");
          alert("Failed to fetch weather data");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [city]);

  return (
    <div className="weatherdisplay">
      {loading && <p>Loading data...</p>}
      {!loading && weatherData && (
        <div className="weathercards">
          <WeatherCard
            title="Temperature"
            value={`${weatherData.current.temp_c}°C`}
          />
          <WeatherCard
            title="Humidity"
            value={`${weatherData.current.humidity}%`}
          />
          <WeatherCard
            title="Condition"
            value={`${weatherData.current.condition.text}`}
          />
          <WeatherCard
            title="Wind Speed"
            value={`${weatherData.current.wind_kph} kph`}
          />
        </div>
      )}
    </div>
  );
};
export default function App() {
  const [city, setCity] = useState("");
  const handlesearch = (search) => {
    setCity(search);
  };
  return (
    <div className="App">
      <Searchbar onSearch={handlesearch} />
      <Weather city={city} />
    </div>
  );
}
