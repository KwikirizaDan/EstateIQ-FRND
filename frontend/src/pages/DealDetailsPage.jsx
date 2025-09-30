import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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
    return <div className="text-center text-gray-500 mt-10">Loading...</div>;
  }

  if (!deal) {
    return <div className="text-center text-red-500 mt-10">Deal not found.</div>;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-2">Deal Details</h2>
      <p className="text-gray-500 mb-6 font-mono text-sm">ID: {deal.id}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-2">Property</h3>
          <Link to={`/properties/${deal.property_id}`} className="text-xl text-blue-600 hover:underline">
            View Property (ID: {deal.property_id})
          </Link>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-2">Offer Amount</h3>
          <p className="text-4xl font-bold text-green-600">${deal.offer_amount.toLocaleString()}</p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-2">Broker</h3>
          <Link to={`/users/${deal.broker_id}`} className="text-lg text-gray-900 hover:underline">
            {deal.broker_id}
          </Link>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-2">Client</h3>
          <Link to={`/users/${deal.client_id}`} className="text-lg text-gray-900 hover:underline">
            {deal.client_id}
          </Link>
        </div>
        <div className="md:col-span-2 bg-gray-50 p-6 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-2">Status</h3>
          <span className="inline-block text-lg font-semibold capitalize px-4 py-2 rounded-full bg-yellow-100 text-yellow-800">
            {deal.status}
          </span>
        </div>
      </div>

      <div className="mt-8">
        <Link
          to={`/conversations`}
          className="w-full text-center block py-3 px-6 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Go to Conversations
        </Link>
      </div>
    </div>
  );
};

export default DealDetailsPage;