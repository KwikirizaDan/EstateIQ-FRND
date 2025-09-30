import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Active Listings</h2>
      {listings.map(listing => (
        <div key={listing.id}>
          <h3>Listing for Property ID: {listing.property_id}</h3>
          <p>Published At: {new Date(listing.published_at).toLocaleString()}</p>
          <p>Visibility: {listing.visibility}</p>
          <div>
            {listing.media_urls.map((url, index) => (
              <img key={index} src={url} alt={`Listing ${listing.id}`} style={{ width: '200px', margin: '5px' }} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListingsPage;