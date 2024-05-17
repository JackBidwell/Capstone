import React from 'react';
import axios from 'axios';

export function CreateUser() {
  const handleSubmitUser = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const email = formData.get('email'); // Get email from form
    const password = formData.get('password'); // Get password from form

    const roleValue = formData.get('role');
    if (!roleValue || roleValue === "0") {
      console.error("Invalid role selected");
      return;
    }

    const userData = {
      FirstName: formData.get('FirstName'),
      LastName: formData.get('LastName'),
      email: email,
      password: password,
      password_confirmation: formData.get('password_confirmation'),
      role: roleValue,
      profile_picture_url: formData.get('profile_picture_url') // Get profile picture URL from form
    };



    axios({
      method: 'post',
      url: `https://capstone-avn4.onrender.com//users.json`,
      data: userData,
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => {
        console.log("User created: ", response.data);
        axios.post(`https://capstone-avn4.onrender.com//sessions.json`, { email, password })
          .then((loginResponse) => {
            console.log("Logged in: ", loginResponse.data);
            localStorage.setItem('jwt', loginResponse.data.jwt);
            localStorage.setItem('name', loginResponse.data.name);
            localStorage.setItem('user_id', loginResponse.data.user_id);
            localStorage.setItem('role', loginResponse.data.role);
            localStorage.setItem('profile_picture', loginResponse.data.profile_picture);
            window.location.href = '/';
          })
          .catch((loginError) => {
            console.error("Login error: ", loginError);
          });
      })
      .catch((error) => {
        console.error("User creation error: ", error);
      });
  };

  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content account-container">
          <div className="modal-header">
            <h5 className="modal-title account-title">Create Account</h5>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmitUser}>
              <input name="FirstName" type="text" className='form-control mb-3' placeholder='First Name' required />
              <input name="LastName" type="text" className='form-control mb-3' placeholder='Last Name' required />
              <input name="email" type="email" className="form-control mb-3" placeholder="Email" required />
              <input name="password" type="password" className="form-control mb-3" placeholder="Password" required />
              <input name="password_confirmation" type="password" className="form-control mb-3" placeholder="Confirm Password" required />
              <select name="role" className="form-control mb-3" required>
                <option value="0">Select Role</option>
                <option value="admin">Admin</option>
                <option value="member">Member</option>
                <option value="trialuser">7 Day Free Trial</option>
                <option value="instructor">Instructor</option>
              </select>
              <input name="profile_picture_url" type="text" className='form-control mb-3' placeholder='Profile Picture URL' required />
              <button type="submit" className="btn btn-primary btn-create-course">Create Account</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
