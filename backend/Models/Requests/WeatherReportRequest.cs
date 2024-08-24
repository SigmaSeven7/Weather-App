using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace WeatherApi.Models.Requests
{
    public class WeatherReportRequest 
    {
        [JsonProperty("latitude")]
        public double? latitude { get; set; }

        [JsonProperty("longitude")]
        public double? longitude { get; set; }

        [JsonProperty("city")]
        public string? city { get; set; }

        [JsonProperty("country")]
        public string? country { get; set; }
 
    }
}
