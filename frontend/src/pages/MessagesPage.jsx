import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import api from '../services/api';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';

const MessagesPage = () => {
  const { id: conversationId } = useParams();
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socketRef = useRef();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await api.get(`/messages/${conversationId}`);
        setMessages(response.data);
      } catch (error) {
        toast.error('Failed to fetch messages.');
      }
    };
    fetchMessages();

    socketRef.current = io('http://127.0.0.1:5000', {
      query: { token: localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).access : null },
    });

    socketRef.current.emit('join', { room: conversationId });

    socketRef.current.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [conversationId]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const messageData = {
      room: conversationId,
      body: newMessage,
      sender_id: user.user_id,
    };
    socketRef.current.emit('message', messageData);
    setNewMessage('');
  };

  return (
    <div>
      <h2>Messages</h2>
      <div>
        {messages.map((msg) => (
          <div key={msg.id}>
            <strong>{msg.sender_id === user.user_id ? 'You' : `User ${msg.sender_id}`}:</strong> {msg.body}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default MessagesPage;