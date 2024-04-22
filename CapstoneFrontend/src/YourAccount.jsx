import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function YourAccount() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem('user_id');
      const jwt = localStorage.getItem('jwt');

      if (!userId || !jwt) {
        setError('User is not logged in.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3000/users/${userId}.json`, {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        });
        setUser(response.data);
      } catch (err) {
        setError('Failed to fetch user details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return <div>Loading your account details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Your Account</h2>
      {user ? (
        <div>
          <p>Name: {user.FirstName} {user.LastName}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>No user details found.</p>
      )}
    </div>
  );
}

export default YourAccount;
