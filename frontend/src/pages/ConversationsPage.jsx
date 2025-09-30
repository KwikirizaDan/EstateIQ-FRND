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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>My Conversations</h2>
      {conversations.map(convo => (
        <div key={convo.id}>
          <p>Conversation about deal: {convo.deal_id}</p>
          <p>Participants: {convo.participants.join(', ')}</p>
          <Link to={`/messages/${convo.id}`}>View Messages</Link>
        </div>
      ))}
    </div>
  );
};

export default ConversationsPage;