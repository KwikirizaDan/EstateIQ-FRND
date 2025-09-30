import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import api from '../services/api';
import { toast } from 'react-toastify';

const HomePage = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await api.get('/properties/');
        setProperties(response.data);
      } catch (error) {
        toast.error('Failed to fetch properties.');
      }
    };
    fetchProperties();
  }, []);

  return (
    <div>
      <h1>Listings on Map</h1>
      <MapContainer center={[0.3476, 32.5825]} zoom={13} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {properties.map(property => (
          <Marker key={property.id} position={[property.latitude, property.longitude]}>
            <Popup>
              <strong>{property.title}</strong><br />
              {property.description}<br />
              Price: ${property.price}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default HomePage;