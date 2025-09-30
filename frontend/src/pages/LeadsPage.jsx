import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';

const LeadsPage = () => {
  const { user } = useContext(AuthContext);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await api.get('/leads/');
        setLeads(response.data);
      } catch (error) {
        toast.error('Failed to fetch leads.');
      } finally {
        setLoading(false);
      }
    };

    if (user && (user.role === 'broker' || user.role === 'admin')) {
      fetchLeads();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || (user.role !== 'broker' && user.role !== 'admin')) {
    return <div>You are not authorized to view this page.</div>;
  }

  return (
    <div>
      <h2>My Leads</h2>
      {leads.map(lead => (
        <div key={lead.id}>
          <p><strong>Client ID:</strong> {lead.client_id}</p>
          <p><strong>Property ID:</strong> {lead.property_id}</p>
          <p><strong>Status:</strong> {lead.status}</p>
        </div>
      ))}
    </div>
  );
};

export default LeadsPage;