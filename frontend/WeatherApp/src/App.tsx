import React from 'react';
import { WeatherProvider } from './contexts/WeatherContext';
import WeatherDashboard from './components/WeatherDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import './App.css'; 

const App: React.FC = () => {
  return (
    <WeatherProvider>
      <div className="app bg-gradient min-vh-100 d-flex flex-column">
        <header className="bg-dark text-white py-4">
          <div className="container">
            <h1 className="display-4">Weather App</h1>
          </div>
        </header>
        <main className="flex-grow-1">
          <WeatherDashboard />
        </main>
        <footer className="bg-dark text-white py-3">
          <div className="container text-center">
            <small>&copy; 2024 Weather App. All rights reserved.</small>
          </div>
        </footer>
      </div>
    </WeatherProvider>
  );
};

export default App;