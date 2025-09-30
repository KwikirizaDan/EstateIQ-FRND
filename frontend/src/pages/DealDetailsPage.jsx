import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';

const DealDetailsPage = () => {
  const { id } = useParams();
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDealDetails = async () => {
      try {
        const response = await api.get(`/deals/${id}`);
        setDeal(response.data);
      } catch (error) {
        toast.error('Failed to fetch deal details.');
      } finally {
        setLoading(false);
      }
    };
    fetchDealDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!deal) {
    return <div>Deal not found.</div>;
  }

  return (
    <div>
      <h2>Deal Details</h2>
      <p><strong>Property ID:</strong> {deal.property_id}</p>
      <p><strong>Broker ID:</strong> {deal.broker_id}</p>
      <p><strong>Client ID:</strong> {deal.client_id}</p>
      <p><strong>Offer Amount:</strong> ${deal.offer_amount}</p>
      <p><strong>Status:</strong> {deal.status}</p>
    </div>
  );
};

export default DealDetailsPage;