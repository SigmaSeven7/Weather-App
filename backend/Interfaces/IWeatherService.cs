using WeatherApi.Models;
using WeatherApi.Models.Requests;
using WeatherApi.Models.Responses;

namespace WeatherApi.Interfaces{
    public interface IWeatherService
    {
        Task<WeatherReport> GetWeatherAsync(WeatherReportRequest request);
    }
}