import React, { useState, useEffect } from "react";
import axios from "axios";
import { RefreshCw, Clock, X } from "lucide-react";

const HomePage = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  //Search History
  useEffect(() => {
    const savedHistory = localStorage.getItem('weatherSearchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('weatherSearchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  const addToSearchHistory = (cityName) => {
    if (!cityName.trim()) return;
    
    const filteredHistory = searchHistory.filter(item => 
      item.toLowerCase() !== cityName.toLowerCase()
    );
    
    const newHistory = [cityName, ...filteredHistory].slice(0, 5);
    setSearchHistory(newHistory);
  };

  const removeFromHistory = (cityToRemove, e) => {
    e.stopPropagation(); 
    const newHistory = searchHistory.filter(item => item !== cityToRemove);
    setSearchHistory(newHistory);
  };
  
  //Main API call
  const fetchWeather = async (cityToFetch = city) => {
    if (!cityToFetch.trim()) return;
    setLoading(true);
    setError("");
    setWeather(null);
    
    try {
      const response = await axios.get(`https://zynetic-9e1u.onrender.com/weather?city=${cityToFetch}`)
      setTimeout(() => {
        setWeather(response.data);
        setLoading(false);
        addToSearchHistory(response.data.city);
        if (cityToFetch !== city) {
          setCity(cityToFetch); 
        }
      }, 800);
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
      setLoading(false);
    }
  };
  
  //Refresh handling
  const handleRefresh = async () => {
    if (!weather) return;
    
    setRefreshing(true);
    try {
      const response = await axios.get(`https://zynetic-9e1u.onrender.com/weather?city=${weather.city}`)

      setTimeout(() => {
        setWeather(response.data);
        setRefreshing(false);
      }, 800);
    } catch (err) {
      setError("Failed to refresh weather data. Please try again.");
      setRefreshing(false);
    }
  };

  const handleHistoryItemClick = (cityName) => {
    fetchWeather(cityName);
  };

  return (
    <div className="weather-container">
      <div className="clouds-container">
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
        <div className="cloud cloud-3"></div>
      </div>
      
      <h1 className="text-6xl font-extrabold mb-8 drop-shadow-2xl animate-fade-in">SkyMist</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && fetchWeather()}
          className="w-full p-4 text-gray-800 border-none focus:outline-none"
          disabled={loading}
        />
        <button 
          onClick={() => fetchWeather()} 
          className={`bg-indigo-700 hover:bg-indigo-800 text-white px-6 py-4 font-bold ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {searchHistory.length > 0 && (
        <div className="search-history">
          <div className="search-history-header">
            <Clock size={16} />
            <span>Recent searches</span>
          </div>
          <div className="search-history-items">
            {searchHistory.map((historyItem, index) => (
              <div 
                key={index} 
                className="search-history-item"
                onClick={() => handleHistoryItemClick(historyItem)}
              >
                <span>{historyItem}</span>
                <button 
                  className="remove-history-item" 
                  onClick={(e) => removeFromHistory(historyItem, e)}
                  aria-label={`Remove ${historyItem} from search history`}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {loading && (
        <div className="loader-container">
          <div className="spinner"></div>
          <p className="loading-text">Fetching weather data...</p>
        </div>
      )}
      
      {error && (
        <div className="error">
          {error}
        </div>
      )}
      
      {weather && (
        <div className="weather-card">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold">{weather.city}</h2>
            <button 
              onClick={handleRefresh} 
              className={`refresh-button ${refreshing ? 'refreshing' : ''}`}
              disabled={refreshing}
              aria-label="Refresh weather data"
            >
              <RefreshCw size={20} />
            </button>
          </div>
          <p className="text-4xl mb-2">{weather.temperature}°C</p>
          <p className="text-xl capitalize mb-4">{weather.condition}</p>
          <div className="weather-details">
            <p>Humidity: {weather.humidity}%</p>
            <p>Wind Speed: {weather.windSpeed} km/h</p>
          </div>
          <img 
            src={weather.icon} 
            alt="Weather Icon" 
            className="mx-auto my-4"
          />
          <p className="text-sm text-center opacity-75">Last updated: {new Date().toLocaleTimeString()}</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;