using Microsoft.AspNetCore.Mvc;
using WeatherApi.Interfaces;
using WeatherApi.Models.Requests;
using WeatherApi.Models.Responses;

[ApiController]
[Route("api/[controller]")]
public class WeatherController : ControllerBase
{
    private readonly IWeatherService _weatherService;

    public WeatherController(IWeatherService weatherService)
    {
        _weatherService = weatherService;
    }

 
    [HttpPost("GetCurrentLocationWeather")]
    public async Task<IActionResult> GetCurrentLocationWeather(WeatherReportRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest("Longitude and Latitude are required");
        }
        WeatherReport weather = await _weatherService.GetWeatherAsync(request);
        return Ok(weather);
    }
}
