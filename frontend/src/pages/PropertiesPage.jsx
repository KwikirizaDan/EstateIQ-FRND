import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
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
        const response = await api.get('/properties/', {
          params: filters,
        });
        setProperties(response.data);
      } catch (error) {
        toast.error('Failed to fetch properties.');
      }
    };
    fetchProperties();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setSearchParams(filters);
  };

  return (
    <div>
      <h2>Browse Properties</h2>
      <form onSubmit={handleFilterSubmit}>
        <input name="location" value={filters.location} onChange={handleFilterChange} placeholder="Location" />
        <select name="type" value={filters.type} onChange={handleFilterChange}>
          <option value="">All Types</option>
          <option value="house">House</option>
          <option value="land">Land</option>
          <option value="rental">Rental</option>
        </select>
        <select name="status" value={filters.status} onChange={handleFilterChange}>
          <option value="">All Statuses</option>
          <option value="available">Available</option>
          <option value="sold">Sold</option>
          <option value="rented">Rented</option>
        </select>
        <input name="min_price" value={filters.min_price} onChange={handleFilterChange} placeholder="Min Price" />
        <input name="max_price" value={filters.max_price} onChange={handleFilterChange} placeholder="Max Price" />
        <button type="submit">Filter</button>
      </form>
      <div>
        {properties.map(property => (
          <div key={property.id}>
            <h3>{property.title}</h3>
            <p>{property.description}</p>
            <p>Price: ${property.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertiesPage;