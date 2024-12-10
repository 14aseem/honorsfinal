'use client';

const WeatherCard = ({ data }) => {
  const { name, main, weather, wind } = data;

  return (
    <div className="mt-6 mx-auto max-w-md bg-white p-6 rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-bold text-gray-700">{name}</h2>
      <p className="text-lg text-gray-500">{weather[0].description}</p>
      <div className="my-4">
        <p className="text-4xl font-bold text-gray-800">{main.temp}°C</p>
        <p className="text-sm text-gray-500">Feels like: {main.feels_like}°C</p>
      </div>
      <div className="flex justify-between text-sm text-gray-500">
        <p>Humidity: {main.humidity}%</p>
        <p>Wind: {wind.speed} m/s</p>
      </div>
    </div>
  );
};

export default WeatherCard;
