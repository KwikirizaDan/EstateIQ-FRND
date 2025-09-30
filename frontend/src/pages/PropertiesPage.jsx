import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Head } from '@unhead/react';
import api from '../services/api';
import { toast } from 'react-toastify';

const PropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    type: searchParams.get('type') || '',
    status: searchParams.get('status') || '',
    min_price: searchParams.get('min_price') || '',
    max_price: searchParams.get('max_price') || '',
    location: searchParams.get('location') || '',
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Create a new URLSearchParams object from the current filters
        const activeFilters = new URLSearchParams();
        for (const key in filters) {
          if (filters[key]) {
            activeFilters.append(key, filters[key]);
          }
        }

        const response = await api.get(`/properties/?${activeFilters.toString()}`);
        setProperties(response.data);
      } catch (error) {
        toast.error('Failed to fetch properties.');
      }
    };
    fetchProperties();
  }, [searchParams]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const newParams = {};
    for (const key in filters) {
        if (filters[key]) {
            newParams[key] = filters[key];
        }
    }
    setSearchParams(newParams);
  };

  return (
    <div className="space-y-8">
      <Head>
        <title>Browse Properties | Real Estate Platform</title>
        <meta name="description" content="Search for houses, land, and rentals. Filter by price, location, and status to find your perfect property." />
      </Head>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Browse Properties</h2>
        <form onSubmit={handleFilterSubmit} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <input
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            placeholder="Location (e.g., Kampala)"
            className="px-3 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="px-3 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            <option value="house">House</option>
            <option value="land">Land</option>
            <option value="rental">Rental</option>
          </select>
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="px-3 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Statuses</option>
            <option value="available">Available</option>
            <option value="sold">Sold</option>
            <option value="rented">Rented</option>
          </select>
          <input
            name="min_price"
            value={filters.min_price}
            onChange={handleFilterChange}
            placeholder="Min Price"
            className="px-3 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="max_price"
            value={filters.max_price}
            onChange={handleFilterChange}
            placeholder="Max Price"
            className="px-3 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full col-span-1 md:col-span-3 lg:col-span-5 py-2 px-4 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Apply Filters
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.length > 0 ? (
          properties.map(property => (
            <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">{property.title}</h3>
                <p className="text-gray-600 mt-2">{property.description}</p>
                <div className="mt-4">
                  <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                    {property.type}
                  </span>
                  <span className={`inline-block text-sm font-semibold mr-2 px-2.5 py-0.5 rounded-full ${property.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {property.status}
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-800 mt-4">${property.price.toLocaleString()}</p>
                <Link to={`/properties/${property.id}`} className="inline-block mt-4 text-blue-500 hover:text-blue-700 font-semibold">
                  View Details &rarr;
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No properties found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default PropertiesPage;