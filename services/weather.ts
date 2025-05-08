import api from './api';

export interface WeatherForecastParams {
  location: {
    latitude: number;
    longitude: number;
  } | {
    city: string;
    country: string;
  };
  startDate: Date;
  endDate?: Date;
}

export interface WeatherData {
  date: string;
  temperature: {
    min: number;
    max: number;
    average: number;
  };
  humidity: number;
  precipitation: {
    probability: number;
    amount: number;
  };
  wind: {
    speed: number;
    direction: string;
  };
  condition: string;
  icon: string;
}

export interface WeatherForecast {
  location: {
    name: string;
    country: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  forecast: WeatherData[];
}

export const getWeatherForecast = async (params: WeatherForecastParams): Promise<WeatherForecast> => {
  const response = await api.get('/weather/forecast', { params });
  return response.data;
};

export const getLocationCoordinates = async (city: string, country: string) => {
  const response = await api.get('/weather/geocode', {
    params: { city, country }
  });
  return response.data;
}; 