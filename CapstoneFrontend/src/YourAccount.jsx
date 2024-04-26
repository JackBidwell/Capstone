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
        console.log(response.data);
      } catch (err) {
        setError('Failed to fetch user details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const deleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirmDelete) {
      return; // Early exit if user cancels the deletion
    }

    const userId = localStorage.getItem('user_id');
    const jwt = localStorage.getItem('jwt');

    try {
      await axios.delete(`http://localhost:3000/users/${userId}.json`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
      localStorage.clear(); // Clear user stored data
      window.location.href = '/'; // Redirect to homepage or login page
    } catch (err) {
      console.error('Failed to delete account:', err);
      setError('Failed to delete your account. Please try again later.');
    }
  };

  if (loading) {
    return <div>Loading your account details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const defaultPic = '/BlankProfile.webp'; // Path to the default image in the public folder

  return (
    <div className="container mt-4" style={{ backgroundColor: 'white' }}>
      <h2>Your Account</h2>
      {user ? (
        <div>
          <img src={user.profile_picture || defaultPic} alt="Profile Picture" />
          <p>Name: {user.FirstName} {user.LastName}</p>
          <p>Email: {user.email}</p>
          <button className="btn btn-danger" onClick={deleteAccount}>Delete Account</button>
        </div>
      ) : (
        <p>No user details found.</p>
      )}
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
}

export default YourAccount;
