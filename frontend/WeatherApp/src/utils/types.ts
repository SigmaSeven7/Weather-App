export interface City {
    name: string;
    country: string;
  }

export interface Weather {
    coord: {
      lon: number | null;
      lat: number | null;
    } | null;
    weather: {
      id: number | null;
      main: string | null;
      description: string | null;
      icon: string | null;
    }[] | null;
    base: string | null;
    main: {
      temp: number | null;
      feels_Like: number | null;
      temp_Min: number | null;
      temp_Max: number | null;
      pressure: number | null;
      humidity: number | null;
      sea_level?: number | null; 
      grnd_level?: number | null; 
    } | null;
    visibility: number | null;
    wind: {
      speed: number | null;
      deg: number | null;
      gust: number | null;
    } | null;
    clouds: {
      all: number | null;
    } | null;
    dt: number | null;
    sys: {
      type: number | null;
      id: number | null;
      country: string | null;
      sunrise: number | null;
      sunset: number | null;
    } | null;
    timezone: number | null;
    id: number | null;
    name: string | null;
    cod: number | null;
  }
  
  