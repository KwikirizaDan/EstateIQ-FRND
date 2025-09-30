import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Head } from '@unhead/react';
import api from '../services/api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Mocking coordinates for display purposes since the API doesn't provide them.
        // In a real application, the backend should provide lat/lng for each property.
        const response = await api.get('/properties/');
        const propertiesWithCoords = response.data.map((p, index) => ({
          ...p,
          latitude: 0.3476 + (Math.random() - 0.5) * 0.1,
          longitude: 32.5825 + (Math.random() - 0.5) * 0.1,
        }));
        setProperties(propertiesWithCoords);
      } catch (error) {
        toast.error('Failed to fetch properties.');
      }
    };
    fetchProperties();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <Head>
        <title>Real Estate Platform | Home</title>
        <meta name="description" content="Explore properties for sale and rent on an interactive map. Find your next home with our real estate platform." />
      </Head>
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        Explore Properties on the Map
      </h1>
      <p className="text-gray-600 mb-6 text-center">
        Click on a marker to see property details.
      </p>
      <div className="h-[60vh] w-full rounded-lg overflow-hidden shadow-lg">
        <MapContainer center={[0.3476, 32.5825]} zoom={13} className="h-full w-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {properties.map(property => (
            <Marker key={property.id} position={[property.latitude, property.longitude]}>
              <Popup>
                <div className="p-1">
                  <h3 className="font-bold text-lg">{property.title}</h3>
                  <p className="text-gray-700">{property.description}</p>
                  <p className="font-semibold text-blue-600 mt-2">
                    ${property.price.toLocaleString()}
                  </p>
                  <Link
                    to={`/properties/${property.id}`}
                    className="text-blue-500 hover:underline mt-2 inline-block"
                  >
                    View Details
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default HomePage;