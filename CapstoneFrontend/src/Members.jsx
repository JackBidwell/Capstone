import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

export function Members() {
  const [members, setMembers] = useState([]); // State to hold the member data

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const jwt = localStorage.getItem('jwt'); // Assuming JWT is used for authentication
        const response = await axios.get('http://localhost:3000/users.json', {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        });
        setMembers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className="container mt-3">
      <h2 className="mb-3">Members List</h2>
      {members.length > 0 ? (
        <div className="list-group">
          {members.map(member => (
            <div key={member.id} className="list-group-item list-group-item-action flex-column align-items-start">
              <h3 className="mb-1">{member.FirstName} {member.LastName}</h3>
              <p className="mb-2">{member.email}</p>
              <p className="text-muted">Role: {member.role} </p>
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
