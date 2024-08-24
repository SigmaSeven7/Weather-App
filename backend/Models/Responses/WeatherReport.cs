
// namespace WeatherApi.Models.Responses{
// public class WeatherReport
// {
//     public double Lat { get; set; }
//     public double Lon { get; set; }
//     public string Timezone { get; set; }
//     public int Timezone_Offset { get; set; }
//     public CurrentWeather Current { get; set; }
//     public List<MinutelyWeather> Minutely { get; set; }
//     public List<HourlyWeather> Hourly { get; set; }
//     public List<DailyWeather> Daily { get; set; }
// }

// public class CurrentWeather
// {
//     public int Dt { get; set; }
//     public int Sunrise { get; set; }
//     public int Sunset { get; set; }
//     public double Temp { get; set; }
//     public double Feels_Like { get; set; }
//     public int Pressure { get; set; }
//     public int Humidity { get; set; }
//     public double Dew_Point { get; set; }
//     public double Uvi { get; set; }
//     public int Clouds { get; set; }
//     public int Visibility { get; set; }
//     public double Wind_Speed { get; set; }
//     public int Wind_Deg { get; set; }
//     public double Wind_Gust { get; set; }
//     public List<Weather> Weather { get; set; }
// }

// public class MinutelyWeather
// {
//     public int Dt { get; set; }
//     public double Precipitation { get; set; }
// }

// public class HourlyWeather
// {
//     public int Dt { get; set; }
//     public double Temp { get; set; }
//     public double Feels_Like { get; set; }
//     public int Pressure { get; set; }
//     public int Humidity { get; set; }
//     public double Dew_Point { get; set; }
//     public double Uvi { get; set; }
//     public int Clouds { get; set; }
//     public int Visibility { get; set; }
//     public double Wind_Speed { get; set; }
//     public int Wind_Deg { get; set; }
//     public double Wind_Gust { get; set; }
//     public List<Weather> Weather { get; set; }
//     public double Pop { get; set; }  // Probability of Precipitation
// }

// public class DailyWeather
// {
//     public int Dt { get; set; }
//     public int Sunrise { get; set; }
//     public int Sunset { get; set; }
//     public int Moonrise { get; set; }
//     public int Moonset { get; set; }
//     public double Moon_Phase { get; set; }
//     public string Summary { get; set; }
//     public Temperature Temp { get; set; }
//     public FeelsLike Feels_Like { get; set; }
//     public int Pressure { get; set; }
//     public int Humidity { get; set; }
//     public double Dew_Point { get; set; }
//     public double Wind_Speed { get; set; }
//     public int Wind_Deg { get; set; }
//     public double Wind_Gust { get; set; }
//     public List<Weather> Weather { get; set; }
//     public int Clouds { get; set; }
//     public double Pop { get; set; }
//     public double? Rain { get; set; } // Nullable because rain might not always be present
//     public double Uvi { get; set; }
// }

// public class Temperature
// {
//     public double Day { get; set; }
//     public double Min { get; set; }
//     public double Max { get; set; }
//     public double Night { get; set; }
//     public double Eve { get; set; }
//     public double Morn { get; set; }
// }

// public class FeelsLike
// {
//     public double Day { get; set; }
//     public double Night { get; set; }
//     public double Eve { get; set; }
//     public double Morn { get; set; }
// }

// public class Weather
// {
//     public int Id { get; set; }
//     public string Main { get; set; }
//     public string Description { get; set; }
//     public string Icon { get; set; }
// }
// }


namespace WeatherApi.Models.Responses
{
    public class WeatherReport
    {
        public Coordinates Coord { get; set; }
        public List<Weather> Weather { get; set; }
        public string Base { get; set; }
        public MainWeather Main { get; set; }
        public int Visibility { get; set; }
        public Wind Wind { get; set; }
        public Clouds Clouds { get; set; }
        public int Dt { get; set; }
        public Sys Sys { get; set; }
        public int Timezone { get; set; }
        public int Id { get; set; }
        public string Name { get; set; }
        public int Cod { get; set; }
    }

    public class Coordinates
    {
        public double Lon { get; set; }
        public double Lat { get; set; }
    }

    public class Weather
    {
        public int Id { get; set; }
        public string Main { get; set; }
        public string Description { get; set; }
        public string Icon { get; set; }
    }

    public class MainWeather
    {
        public double Temp { get; set; }
        public double Feels_Like { get; set; }
        public double Temp_Min { get; set; }
        public double Temp_Max { get; set; }
        public int Pressure { get; set; }
        public int Humidity { get; set; }
        public int? Sea_Level { get; set; } // Nullable because it might not always be present
        public int? Grnd_Level { get; set; } // Nullable because it might not always be present
    }

    public class Wind
    {
        public double Speed { get; set; }
        public int Deg { get; set; }
        public double Gust { get; set; }
    }

    public class Clouds
    {
        public int All { get; set; }
    }

    public class Sys
    {
        public int Type { get; set; }
        public int Id { get; set; }
        public string Country { get; set; }
        public int Sunrise { get; set; }
        public int Sunset { get; set; }
    }
}
