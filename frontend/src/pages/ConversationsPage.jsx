import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';

const ConversationsPage = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await api.get('/conversations/');
        setConversations(response.data);
      } catch (error) {
        toast.error('Failed to fetch conversations.');
      } finally {
        setLoading(false);
      }
    };
    fetchConversations();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500 mt-10">Loading...</div>;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Conversations</h2>
      {conversations.length > 0 ? (
        <div className="space-y-6">
          {conversations.map(convo => (
            <div key={convo.id} className="p-6 border rounded-lg hover:shadow-lg transition-shadow duration-300 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Deal ID</p>
                <Link to={`/deals/${convo.deal_id}`} className="text-lg font-semibold text-blue-600 hover:underline">
                  {convo.deal_id}
                </Link>
                <p className="text-sm text-gray-600 mt-2">
                  <span className="font-semibold">Participants:</span> {convo.participants.join(', ')}
                </p>
              </div>
              <Link
                to={`/messages/${convo.id}`}
                className="inline-block py-2 px-4 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                View Messages
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center py-10 text-gray-500">You have no active conversations.</p>
      )}
    </div>
  );
};

export default ConversationsPage;