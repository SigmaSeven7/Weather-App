import React, { useState } from 'react';
import { Card, Button, Modal, Row, Col } from 'react-bootstrap';
import { Weather } from '../utils/types';
import { 
  WiThermometer, 
  WiStrongWind, 
  WiHumidity, 
  WiBarometer, 
  WiDaySunny, 
  WiNightClear,
  WiCloudy
} from 'react-icons/wi';

interface WeatherCardProps {
  weather: Weather;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const [showModal, setShowModal] = useState(false);

  const temperature = weather.main?.temp ? weather.main.temp - 273.15 : null;
  const description = weather.weather?.[0]?.description || "No description available";
  const cityName = weather.name || "Current Location";

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const getWeatherIcon = (iconCode: string) => {
    const iconMap: { [key: string]: React.ReactElement } = {
      '01d': <WiDaySunny />,
      '01n': <WiNightClear />,
      '02d': <WiCloudy />,
      '02n': <WiCloudy />,
    };
    return iconMap[iconCode] || <WiCloudy />;
  };

  return (
    <>
      <Card className="weather-card h-100 shadow-sm">
        <Card.Body className="d-flex flex-column">
          <Card.Title as="h3" className="h5 mb-3">{cityName}</Card.Title>
          <Card.Text className="mb-2">{description}</Card.Text>
          <Card.Text className="fs-2 fw-bold mb-3">
            {temperature !== null ? `${temperature.toFixed(1)}°C` : "N/A"}
          </Card.Text>
          <Button
            variant="outline-primary"
            className="mt-auto"
            onClick={handleShowModal}
          >
            More Info
          </Button>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            {getWeatherIcon(weather.weather?.[0]?.icon || '02d')}
            <span className="ms-2">{cityName} Weather</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="gy-4">
            <Col md={6}>
              <h5><WiThermometer /> Temperature</h5>
              <p>It's currently {temperature !== null ? `${temperature.toFixed(1)}°C` : "N/A"}</p>
              <p>Feels like {weather.main?.feels_Like ? `${(weather.main.feels_Like - 273.15).toFixed(1)}°C` : "N/A"}</p>
              <p>Today's high: {weather.main?.temp_Max ? `${(weather.main.temp_Max - 273.15).toFixed(1)}°C` : "N/A"}</p>
              <p>Today's low: {weather.main?.temp_Min ? `${(weather.main.temp_Min - 273.15).toFixed(1)}°C` : "N/A"}</p>
            </Col>
            <Col md={6}>
              <h5><WiStrongWind /> Wind</h5>
              <p>Wind is blowing at {weather.wind?.speed ? `${weather.wind.speed} m/s` : "N/A"}</p>
              <p>Wind direction: {weather.wind?.deg ? `${weather.wind.deg}°` : "N/A"}</p>
            </Col>
            <Col md={6}>
              <h5><WiHumidity /> Humidity & Visibility</h5>
              <p>Humidity is at {weather.main?.humidity ? `${weather.main.humidity}%` : "N/A"}</p>
              <p>You can see for {weather.visibility ? `${weather.visibility / 1000} km` : "N/A"}</p>
            </Col>
            <Col md={6}>
              <h5><WiBarometer /> Pressure</h5>
              <p>Atmospheric pressure: {weather.main?.pressure ? `${weather.main.pressure} hPa` : "N/A"}</p>
            </Col>
            <Col md={12}>
              <h5><WiDaySunny /> Sun Schedule</h5>
              <p>Sun rises at {weather.sys?.sunrise ? new Date(weather.sys.sunrise * 1000).toLocaleTimeString() : "N/A"}</p>
              <p>Sun sets at {weather.sys?.sunset ? new Date(weather.sys.sunset * 1000).toLocaleTimeString() : "N/A"}</p>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default WeatherCard;