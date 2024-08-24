using System.Text.Json.Serialization;

public class Coordinates
{
    [JsonPropertyName("lat")]
    public double Lat { get; set; }

    [JsonPropertyName("lon")]
    public double Lon { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; }
}