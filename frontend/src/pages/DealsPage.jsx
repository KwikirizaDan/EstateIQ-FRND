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
    return <div className="text-center text-gray-500 mt-10">Loading...</div>;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Deals</h2>
      {deals.length > 0 ? (
        <div className="space-y-6">
          {deals.map(deal => (
            <div key={deal.id} className="p-6 border rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <p className="text-sm text-gray-500">Property ID</p>
                  <Link to={`/properties/${deal.property_id}`} className="text-lg font-semibold text-blue-600 hover:underline">
                    {deal.property_id}
                  </Link>
                </div>
                <div className="mt-4 md:mt-0 md:text-right">
                  <p className="text-sm text-gray-500">Offer Amount</p>
                  <p className="text-2xl font-bold text-gray-800">${deal.offer_amount.toLocaleString()}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 capitalize">
                    {deal.status}
                  </span>
                </div>
                <Link to={`/deals/${deal.id}`} className="mt-4 md:mt-0 inline-block text-blue-500 hover:text-blue-700 font-semibold">
                  View Details &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center py-10 text-gray-500">You do not have any deals yet.</p>
      )}
    </div>
  );
};

export default DealsPage;