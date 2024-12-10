'use client';

import { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';

export default function WeatherApp() {
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = async (city) => {
    const apiKey = '30a9901ce5264ceb5f97c22ad2264b0d';
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  const today = new Date();
  const formattedDate = today.toLocaleDateString(); // You can customize the format if needed

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-300 p-6">
      <h1 className="text-center text-5xl font-bold text-white mb-6">Weather App</h1>
      <h3 className="text-center text-xl font-medium text-white mb-6">{`${formattedDate}`}</h3>
      <p className="text-center text-xl font-medium text-white mb-6">By aseem</p>
      <hr></hr>
      <SearchBar onSearch={fetchWeather} />
      {weatherData && <WeatherCard data={weatherData} />}
    </div>
  );
}
