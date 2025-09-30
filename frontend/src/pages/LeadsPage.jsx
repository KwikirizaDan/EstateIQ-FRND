import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

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
    return <div className="text-center text-gray-500 mt-10">Loading...</div>;
  }

  if (!user || (user.role !== 'broker' && user.role !== 'admin')) {
    return (
      <div className="text-center text-red-500 mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold">Access Denied</h2>
        <p className="mt-2">You are not authorized to view this page.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Leads</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead ID</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client ID</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property ID</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {leads.length > 0 ? (
              leads.map(lead => (
                <tr key={lead.id} className="hover:bg-gray-100">
                  <td className="py-4 px-6 whitespace-nowrap font-mono text-sm text-gray-700">{lead.id}</td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <Link to={`/users/${lead.client_id}`} className="text-blue-600 hover:underline">
                      {lead.client_id}
                    </Link>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <Link to={`/properties/${lead.property_id}`} className="text-blue-600 hover:underline">
                      {lead.property_id}
                    </Link>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 capitalize">
                      {lead.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-10 text-gray-500">You have no active leads.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadsPage;