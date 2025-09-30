import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const ListingsPage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await api.get('/listings/');
        setListings(response.data);
      } catch (error) {
        toast.error('Failed to fetch listings.');
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500 mt-10">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800 text-center">Active Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.length > 0 ? (
          listings.map(listing => (
            <div key={listing.id} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
              {listing.media_urls.length > 0 && (
                <img
                  src={listing.media_urls[0]}
                  alt={`Listing for Property ID ${listing.property_id}`}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">
                  <Link to={`/properties/${listing.property_id}`} className="hover:underline">
                    Property ID: {listing.property_id}
                  </Link>
                </h3>
                <p className="text-gray-600 mt-2">
                  Published: {new Date(listing.published_at).toLocaleDateString()}
                </p>
                <div className="mt-4">
                  <span className="inline-block bg-gray-200 text-gray-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                    {listing.visibility}
                  </span>
                </div>
                <Link to={`/properties/${listing.property_id}`} className="inline-block mt-4 text-blue-500 hover:text-blue-700 font-semibold">
                  View Property &rarr;
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No active listings found.</p>
        )}
      </div>
    </div>
  );
};

export default ListingsPage;