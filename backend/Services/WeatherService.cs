using WeatherApi.Interfaces;
using WeatherApi.Models.Requests;
using WeatherApi.Models.Responses;
using static WeatherApi.Services.AppSettingsService;
using System.Text.Json;
using StackExchange.Redis;


namespace WeatherApi.Services
{
    public class WeatherService : IWeatherService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;
        private readonly string _getWeatherBaseUrl;

         private readonly IConnectionMultiplexer _redis;
        public WeatherService(HttpClient httpClient, AppSettingsService appSettingsService, IConnectionMultiplexer redis)

        {
            var openWeatherConfig = appSettingsService.GetSection<OpenWeatherConfig>("OpenWeatherConfig");
            _httpClient = httpClient;
            _apiKey = openWeatherConfig.ApiKey;
            _getWeatherBaseUrl = openWeatherConfig.GetWeatherUrl;
             _redis = redis;

        }

public async Task<WeatherReport> GetWeatherAsync(WeatherReportRequest request)
{
    try
    {
        var db = _redis.GetDatabase();
        var cacheKey = request.latitude.HasValue && request.longitude.HasValue
            ? $"weather:{request.latitude}:{request.longitude}"
            : $"weather:{request.city}:{request.country}";

        var cachedWeather = await db.StringGetAsync(cacheKey);

        if (!cachedWeather.IsNullOrEmpty)
        {
           
            return JsonSerializer.Deserialize<WeatherReport>(cachedWeather);
        }

        string url;

        if (request.latitude.HasValue && request.longitude.HasValue)
        {

            url = $"{_getWeatherBaseUrl}?lat={request.latitude}&lon={request.longitude}&appid={_apiKey}";
        }
        else if (!string.IsNullOrEmpty(request.city) && !string.IsNullOrEmpty(request.country))
        {
      
            url = $"{_getWeatherBaseUrl}?q={request.city},{request.country}&appid={_apiKey}";
        }
        else
        {
            throw new ArgumentException("Either coordinates or city and country must be provided.");
        }

        // Make the HTTP GET request
        var response = await _httpClient.GetAsync(url);

        if (response.IsSuccessStatusCode)
        {
    
            var weatherReport = await response.Content.ReadFromJsonAsync<WeatherReport>();


            var serializedWeather = JsonSerializer.Serialize(weatherReport);
            await db.StringSetAsync(cacheKey, serializedWeather, TimeSpan.FromMinutes(30));

            return weatherReport;
        }
        else
        {
            Console.WriteLine($"Failed to fetch weather data. Status code: {response.StatusCode}");
            return null;
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"An error occurred while fetching weather data: {ex.Message}");
        throw;
    }
}

}
}
