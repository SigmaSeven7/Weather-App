// // src/components/MapSelector.tsx

// import React, { useState, useEffect, useRef } from 'react';
// import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// interface MapSelectorProps {
//   onLocationSelect: (city: string, country: string) => void;
// }

// const MapSelector: React.FC<MapSelectorProps> = ({ onLocationSelect }) => {
//   const [position, setPosition] = useState<L.LatLng | null>(null);
//   const markerRef = useRef<L.Marker | null>(null);

//   const MapEvents = () => {
//     useMapEvents({
//       click(e) {
//         setPosition(e.latlng);
//       },
//     });
//     return null;
//   };

//   useEffect(() => {
//     if (position) {
//       fetch(`https://nominatim.openstreetmap.org/reverse?lat=${position.lat}&lon=${position.lng}&format=json`)
//         .then(response => response.json())
//         .then(data => {
//           const city = data.address.city || data.address.town || data.address.village || '';
//           const country = data.address.country || '';
//           onLocationSelect(city, country);
//         })
//         .catch(error => console.error('Error fetching location data:', error));
//     }
//   }, [position, onLocationSelect]);

//   useEffect(() => {
//     if (position && markerRef.current) {
//       markerRef.current.setLatLng(position);
//     } else if (position) {
//       markerRef.current = L.marker(position).addTo(map);
//     }
//   }, [position]);

//   return (
//     <MapContainer center={[0, 0]} zoom={2} style={{ height: '400px', width: '100%' }}>
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//       <MapEvents />
//     </MapContainer>
//   );
// };

// export default MapSelector;

// src/components/MapSelector.tsx

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapSelectorProps {
  onLocationSelect: (city: string, country: string) => void;
}

const MapEvents: React.FC<{ setPosition: (position: L.LatLng) => void }> = ({ setPosition }) => {
  const map = useMap();

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 0);
  }, [map]);

  return null;
};

const DraggableMarker: React.FC<{ position: L.LatLng, setPosition: (position: L.LatLng) => void }> = ({ position, setPosition }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(position, map.getZoom());
  }, [position, map]);

  return (
    <Marker
      position={position}
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          const marker = e.target;
          setPosition(marker.getLatLng());
        },
      }}
    />
  );
};

const MapSelector: React.FC<MapSelectorProps> = ({ onLocationSelect }) => {
  const [position, setPosition] = useState<L.LatLng | null>(null);

  useEffect(() => {
    if (position) {
      fetch(`https://nominatim.openstreetmap.org/reverse?lat=${position.lat}&lon=${position.lng}&format=json`)
        .then(response => response.json())
        .then(data => {
          const city = data.address.city || data.address.town || data.address.village || '';
          const country = data.address.country || '';
          onLocationSelect(city, country);
        })
        .catch(error => console.error('Error fetching location data:', error));
    }
  }, [position, onLocationSelect]);

  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: '400px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapEvents setPosition={setPosition} />
      {position && <DraggableMarker position={position} setPosition={setPosition} />}
    </MapContainer>
  );
};

export default MapSelector;