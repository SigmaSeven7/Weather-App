import axios from "axios";
import { Weather } from "./types";

export const fetchWeather = async (
    lat?: number | null,
    lon?: number | null,
    city?: string | null,
    country?: string | null,
): Promise<Weather | null> => {
    try {
        let weatherResponse;

        if (lat !== null && lon !== null) {
           
            weatherResponse = await axios.post(
                `http://localhost:3000/api/weather/GetCurrentLocationWeather`,
                {
                    latitude: lat,
                    longitude: lon,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            
            const locationResponse = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`
            );

          
            const cityName = locationResponse?.data?.address?.city;

           
            const weatherData = weatherResponse.data;
            if (cityName) {
                weatherData.name = cityName;
            }

            return weatherData;

        } else if (city && country) {
            
            weatherResponse = await axios.post(
                `http://localhost:3000/api/weather/GetCurrentLocationWeather`,
                {
                    city: city,
                    country: country,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            const weatherData = weatherResponse.data;
            if (weatherData) {
                weatherData.name = city;  
            }
            return weatherData;

        } else {
            throw new Error('Insufficient parameters provided.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
};
