using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace WeatherApi.Models.Requests
{
    public class CoordinatesRequest
    {
        [Required]
        [JsonProperty("city")]
        public string city { get; set; }
        
        [Required]
        [JsonProperty("country")]
        public string country { get; set; }

    }
}