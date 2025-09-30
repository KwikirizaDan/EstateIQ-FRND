import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Head } from '@unhead/react';
import api from '../services/api';
import { toast } from 'react-toastify';

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await api.get(`/properties/${id}`);
        setProperty(response.data);
      } catch (error) {
        toast.error('Failed to fetch property details.');
      } finally {
        setLoading(false);
      }
    };
    fetchPropertyDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center text-gray-500 mt-10">Loading...</div>;
  }

  if (!property) {
    return <div className="text-center text-red-500 mt-10">Property not found.</div>;
  }

  return (
    <>
      <Head>
        <title>{`${property.title} | Real Estate Platform`}</title>
        <meta name="description" content={property.description} />
      </Head>
      <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">{property.title}</h2>
        <p className="text-gray-600 mb-6">{property.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-700">Location</h3>
          <p className="text-lg text-gray-900">{property.location}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-700">Property Type</h3>
          <p className="text-lg text-gray-900 capitalize">{property.type}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-700">Status</h3>
          <span className={`inline-block text-lg font-semibold capitalize px-3 py-1 rounded-full ${property.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {property.status}
          </span>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-700">Price</h3>
          <p className="text-3xl font-bold text-blue-600">${property.price.toLocaleString()}</p>
        </div>
      </div>

      <div className="mt-8">
        <button className="w-full py-3 px-6 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Contact Broker
        </button>
      </div>
    </div>
    </>
  );
};

export default PropertyDetailsPage;