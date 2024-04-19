import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function MessageBoard() {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const jwt = localStorage.getItem('jwt');
      const response = await axios.get('http://localhost:3000/messages.json', {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div>
      <h2>Message Board</h2>
      <div>
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <div key={index} style={{ margin: '10px', padding: '10px', border: '1px solid #ccc' }}>
              <p>{message.content}</p>
              <small>Posted on: {new Date(message.created_at).toLocaleDateString()}</small>
            </div>
          ))
        ) : (
          <p>No messages found.</p>
        )}
      </div>
    </div>
  );
};

export default MessageBoard;
