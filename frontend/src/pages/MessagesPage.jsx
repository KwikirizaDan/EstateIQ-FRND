import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import io from 'socket.io-client';
import api from '../services/api';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';

const MessagesPage = () => {
  const { id: conversationId } = useParams();
  const { user, authTokens } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const socketRef = useRef();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await api.get(`/messages/${conversationId}`);
        setMessages(response.data);
      } catch (error) {
        toast.error('Failed to fetch messages.');
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();

    if (authTokens?.access_token) {
      socketRef.current = io('http://127.0.0.1:5000', {
        query: { token: authTokens.access_token },
      });

      socketRef.current.emit('join', { room: conversationId });

      socketRef.current.on('message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        socketRef.current.disconnect();
      };
    }
  }, [conversationId, authTokens]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !socketRef.current) return;

    const messageData = {
      room: conversationId,
      body: newMessage,
      sender_id: user.id, // Assuming the user object from context has the id
    };
    socketRef.current.emit('message', messageData);
    // Add message to local state immediately for better UX
    setMessages((prevMessages) => [...prevMessages, { ...messageData, id: Date.now() }]);
    setNewMessage('');
  };

  if (loading) {
    return <div className="text-center text-gray-500 mt-10">Loading messages...</div>;
  }

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] bg-white rounded-lg shadow-md">
      <div className="p-4 border-b">
        <h2 className="text-2xl font-bold text-gray-800">Conversation</h2>
        <p className="text-sm text-gray-500">ID: {conversationId}</p>
      </div>
      <div className="flex-grow p-6 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={msg.id || index}
              className={`flex items-start gap-3 ${msg.sender_id === user.id ? 'justify-end' : ''}`}
            >
              <div
                className={`p-3 rounded-lg max-w-xs lg:max-w-md ${
                  msg.sender_id === user.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                <p className="text-sm">{msg.body}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex gap-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="py-2 px-4 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessagesPage;