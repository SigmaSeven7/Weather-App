import { Container, Row, Col, Spinner, Card, Button } from 'react-bootstrap';
import { useWeather } from '../contexts/WeatherContext';
import WeatherCard from './WeatherCard';
import MapSelector from './MapSelector';
import { motion } from 'framer-motion';
import { useState } from 'react';

const WeatherDashboard = () => {
  const { userWeather, otherWeathers, loading, addLocation } = useWeather();
  const [showMap, setShowMap] = useState(false);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  const handleLocationSelect = (city: string, country: string) => {
    addLocation(city, country);
    setShowMap(false);
  };

  return (
    <Container fluid className="weather-dashboard py-5">
      <Row className="d-flex justify-content-center mb-5">
        <Col>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-light bg-opacity-75 shadow-lg">
              <Card.Body>
                <h1 className="text-center mb-4">Weather Dashboard</h1>
                {userWeather && (
                  <section className="d-flex flex-column align-items-center mb-5">
                    <h2 className="h3 mb-4 text-primary">Your Location</h2>
                    <WeatherCard weather={userWeather} />
                  </section>
                )}
                <section className='mb-8'>
                  <h2 className="h3 mb-4 text-primary">Popular Locations</h2>
                  <Row xs={1} md={2} lg={3} className="g-4 mb-4">
                    {otherWeathers.map((weather, index) => (
                      <Col key={weather.name} className='d-flex justify-content-center'>
                        <motion.div
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <WeatherCard weather={weather} />
                        </motion.div>
                      </Col>
                    ))}
                  </Row>
                </section>
                <section className='mb-4 mt-8'>
                  <Button onClick={() => setShowMap(!showMap)} className="mb-3">
                    {showMap ? 'Hide Map' : 'Add New Location'}
                  </Button>
                  {showMap && (
                    <MapSelector onLocationSelect={handleLocationSelect} />
                  )}
                </section>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default WeatherDashboard;