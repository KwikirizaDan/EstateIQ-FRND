import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';

const DealsPage = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await api.get('/deals/');
        setDeals(response.data);
      } catch (error) {
        toast.error('Failed to fetch deals.');
      } finally {
        setLoading(false);
      }
    };
    fetchDeals();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>My Deals</h2>
      {deals.map(deal => (
        <div key={deal.id}>
          <p><strong>Property ID:</strong> {deal.property_id}</p>
          <p><strong>Offer Amount:</strong> ${deal.offer_amount}</p>
          <p><strong>Status:</strong> {deal.status}</p>
          <Link to={`/deals/${deal.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default DealsPage;