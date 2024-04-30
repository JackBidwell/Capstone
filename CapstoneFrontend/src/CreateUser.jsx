import axios from 'axios';

export function CreateUser() {
  const handleSubmitUser = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);


    const roleValue = formData.get('role');
    if (!roleValue || roleValue === "0") {
      console.error("Invalid role selected");
      return;
    }

    console.log("Form data to submit:", formData);


    axios({
      method: 'post',
      url: "http://[::1]:3000/users.json",
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then((response) => {
        console.log(response.data);
        alert("Account created successfully!");
        window.location.href = '/';
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create Account</h5>
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
              <input name="profile_picture" type="file" className='form-control mb-3' required />
              <button type="submit" className="btn btn-primary">Create Account</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
