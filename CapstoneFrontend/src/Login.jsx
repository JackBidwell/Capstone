import React, { useState } from 'react';
import axios from 'axios';
import { Link, Route } from 'react-router-dom';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://[::1]:3000/sessions.json", { email, password })
      .then((response) => {
        window.location.href = "/";
        console.log(response.data);
        localStorage.setItem('jwt', response.data.jwt);
        localStorage.setItem('name', response.data.name);
        localStorage.setItem('user_id', response.data.user_id)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Login</h5>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <input name="email" type="email" className="form-control mb-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input name="password" type="password" className="form-control mb-3" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button type="submit" className="btn btn-primary">Log In</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
