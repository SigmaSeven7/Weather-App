using Microsoft.Extensions.Configuration;

namespace WeatherApi.Services
{
    public class AppSettingsService
    {
        private readonly IConfiguration _configuration;


        public class OpenWeatherConfig
        {
            public string ApiKey { get; set; }
            public string GetWeatherUrl { get; set; }
            public string GetCoordinatesUrl { get; set; }
        }
        public AppSettingsService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        /// <summary>
        /// Retrieves a configuration value by key.
        /// </summary>
        /// <typeparam name="T">The type of the value to retrieve.</typeparam>
        /// <param name="key">The key of the configuration value.</param>
        /// <returns>The configuration value.</returns>
        public T GetValue<T>(string key)
        {
            return _configuration.GetValue<T>(key);
        }

        /// <summary>
        /// Retrieves a section of configuration as an object.
        /// </summary>
        /// <typeparam name="T">The type of the object to retrieve.</typeparam>
        /// <param name="section">The section name in the configuration.</param>
        /// <returns>The object with values populated from the section.</returns>
        public T GetSection<T>(string section) where T : new()
        {
            T configSection = new();
            _configuration.GetSection(section).Bind(configSection);
            return configSection;
        }
    }
}
