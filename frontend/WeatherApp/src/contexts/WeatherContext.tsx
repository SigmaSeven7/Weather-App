import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchWeather } from '../utils/api';
import { Weather, City } from '../utils/types';

interface WeatherContextType {
  userWeather: Weather | null;
  otherWeathers: Weather[];
  loading: boolean;
  addLocation: (city: string, country: string) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};

export const WeatherProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [userWeather, setUserWeather] = useState<Weather | null>(null);
  const [otherWeathers, setOtherWeathers] = useState<Weather[]>([]);
  const [loading, setLoading] = useState(true);

  const otherCities: City[] = [
    { name: 'London', country: 'GB' },
    { name: 'New York', country: 'US' },
    { name: 'Tokyo', country: 'JP' }
  ];


  const addLocation = async (city: string, country: string) => {
    setLoading(true);
    try {
      const newWeather = await fetchWeather(null, null, city, country);
      if (newWeather) {
        setOtherWeathers(prev => [...prev, newWeather]);
        
        const savedLocations = JSON.parse(localStorage.getItem('savedLocations') || '[]') as City[];
        savedLocations.push({ name: city, country });
        localStorage.setItem('savedLocations', JSON.stringify(savedLocations));
      }
    } catch (error) {
      console.error('Error fetching weather for new location:', error);
    }
    setLoading(false);
  };


  useEffect(() => {
    const fetchUserLocationWeather = async () => {
      const storedLatitude = localStorage.getItem('latitude');
      const storedLongitude = localStorage.getItem('longitude');

      if (storedLatitude && storedLongitude) {
        const latitude = parseFloat(storedLatitude);
        const longitude = parseFloat(storedLongitude);
        const userWeatherData = await fetchWeather(latitude, longitude);
        setUserWeather(userWeatherData);
        setLoading(false);
      } else {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            if (window.confirm('Do you want to save your location for future visits?')) {
              localStorage.setItem('latitude', latitude.toString());
              localStorage.setItem('longitude', longitude.toString());
            }
            const userWeatherData = await fetchWeather(latitude, longitude);
            setUserWeather(userWeatherData);
            setLoading(false);
          },
          (error) => {
            console.error('Error getting location:', error);
            setLoading(false);
          }
        );
      }
    };

    const fetchOtherWeathers = async () => {
      const savedLocations = JSON.parse(localStorage.getItem('savedLocations') || '[]') as City[];
      const allLocations = [...otherCities, ...savedLocations];
      
      const weatherPromises = allLocations.map(city =>
        fetchWeather(null, null, city.name, city.country)
      );
      const results = await Promise.all(weatherPromises);
      setOtherWeathers(results.filter(Boolean) as Weather[]);
    };

    fetchUserLocationWeather();
    fetchOtherWeathers();
  }, []);

  return (
    <WeatherContext.Provider value={{ addLocation,userWeather, otherWeathers, loading }}>
      {children}
    </WeatherContext.Provider>
  );
};