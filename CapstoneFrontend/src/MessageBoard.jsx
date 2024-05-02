import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faReply } from '@fortawesome/free-solid-svg-icons';

export function MessageBoard() {
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const [replies, setReplies] = useState({});
  const currentUser = localStorage.getItem('user_id');

  const fetchMessages = async () => {
    const jwt = localStorage.getItem('jwt');
    try {
      const response = await axios.get('http://localhost:3000/messages.json', {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
      setMessages(response.data);
      const replyInit = {};
      response.data.forEach(msg => replyInit[msg.id] = '');
      setReplies(replyInit);
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

  const postReply = async (messageId) => {
    const jwt = localStorage.getItem('jwt');
    try {
      await axios.post(`http://localhost:3000/responses.json`, { content: replies[messageId], message_id: messageId, user_id: currentUser }, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json'
        }
      });
      fetchMessages();
    } catch (error) {
      console.error('Error posting reply:', error);
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

  const handleReplyChange = (messageId, content) => {
    setReplies({ ...replies, [messageId]: content });
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const getRoleClass = (role) => {
    switch (role.toLowerCase()) {
      case 'trialuser':
        return 'badge bg-secondary';
      case 'instructor':
        return 'badge bg-primary';
      case 'admin':
        return 'badge bg-danger';
      case 'member':
        return 'badge bg-success';
      default:
        return '';
    }
  };

  return (
    <div className="Messages">
      <div className="message-container">
        <h2 className='title'>Messages</h2>
        <div className="list-group">
          {messages.length > 0 ? (
            messages.map((message) => (
              <div key={message.id} className="list-group-item">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className={getRoleClass(message.sender.Role)}>
                    {message.sender.Role}: {message.sender.FirstName} {message.sender.LastName}
                  </h5>
                  <small>Posted on: {new Date(message.created_at).toLocaleDateString()}</small>
                  {currentUser === message.sender.id && (
                    <FontAwesomeIcon icon={faTrashAlt} onClick={() => deleteMessage(message.id)} style={{ cursor: 'pointer' }} />
                  )}
                </div>
                <p className="mb-1">{message.content}</p>
                <div className="response-container">
                  <ul className="response-list">
                    {message.responses.map((response) => (
                      <li key={response.id} className="response-item">
                        <strong>Response from {response.sender.FirstName} {response.sender.LastName} ({response.sender.Role}):</strong>
                        <p>{response.content}</p>
                        <small>Replied on: {new Date(response.created_at).toLocaleDateString()}</small>
                      </li>
                    ))}
                  </ul>
                  <div>
                    <textarea
                      className="form-control mt-2"
                      value={replies[message.id]}
                      onChange={(e) => handleReplyChange(message.id, e.target.value)}
                      placeholder="Write a reply..."
                    />
                    <button className="btn btn-primary mt-2" onClick={() => postReply(message.id)}>Reply</button>
                  </div>
                </div>
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
    </div>
  );
};

export default MessageBoard;
