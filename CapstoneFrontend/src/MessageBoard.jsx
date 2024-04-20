import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export function MessageBoard() {
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');

  const fetchMessages = async () => {
    const jwt = localStorage.getItem('jwt');
    try {
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

  const postMessage = async (event) => {
    event.preventDefault();
    const jwt = localStorage.getItem('jwt');
    try {
      await axios.post('http://localhost:3000/messages.json', { content: messageContent }, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json'
        }
      });
      setMessageContent('');
      fetchMessages();
    } catch (error) {
      console.error('Error posting message:', error);
    }
  };

  const deleteMessage = async (messageId) => {
    const jwt = localStorage.getItem('jwt');
    try {
      await axios.delete(`http://localhost:3000/messages/${messageId}.json`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
      fetchMessages();
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Message Board</h2>
      <div className="list-group">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <div key={index} className="list-group-item list-group-item-action flex-column align-items-start">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="badge bg-secondary">{message.sender.Role}: {message.sender.FirstName} {message.sender.LastName}</h5>
                <small>Posted on: {new Date(message.created_at).toLocaleDateString()}</small>
                <FontAwesomeIcon icon={faTrashAlt} onClick={() => deleteMessage(message.id)} style={{ cursor: 'pointer' }} />
              </div>
              <p className="mb-1">{message.content}</p>
            </div>
          ))
        ) : (
          <p className="text-muted">No messages found.</p>
        )}
      </div>
      <form onSubmit={postMessage} className="mt-3">
        <textarea
          className="form-control"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          placeholder="Write your message here..."
          required
        />
        <button type="submit" className="btn btn-primary mt-2">Post Message</button>
      </form>
    </div>
  );
};

export default MessageBoard;
