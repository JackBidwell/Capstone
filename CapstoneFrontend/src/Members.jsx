import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Members() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const jwt = localStorage.getItem('jwt');
      const response = await axios.get('https://capstone-avn4.onrender.com/users.json', {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const jwt = localStorage.getItem('jwt');
      await axios.delete(`https://capstone-avn4.onrender.com/users/${userId}.json`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
      setMembers(members.filter(member => member.id !== userId));
      console.log('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="container" style={{ opacity: '0.85' }}>
      <h2 className="tile">Members List</h2>
      {members.length > 0 ? (
        <div className="list-group">
          {members.map(member => (
            <div key={member.id} className="list-group-item list-group-item-action flex-column align-items-start">
              <h3 className="mb-1">{member.FirstName} {member.LastName}</h3>
              <p className="mb-2">{member.email}</p>
              <p className="text-muted">Role: {member.role}</p>
              <button onClick={() => handleDelete(member.id)} className="btn btn-danger">Delete</button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted">No members found.</p>
      )}
    </div>
  );
}

export default Members;
