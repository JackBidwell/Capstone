import axios from 'axios';

export function CreateUser() {
  const handleSubmitUser = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const formObject = {};
    formData.forEach((value, key) => {
      if (key === 'role') {
        const roleValue = parseInt(value, 10);
        if (!isNaN(roleValue) && roleValue !== 0) {
          formObject[key] = roleValue;
        } else {
          console.error("Invalid role selected");
          return; // Early exit if the role is not valid
        }
      } else {
        formObject[key] = value;
      }
    });

    console.log("Form data to submit:", formObject); // Debug log

    axios.post("http://[::1]:3000/users.json", formObject)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("flashMessage", "Thank you for signing up");
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
                <option value="2">7 Day Free Trial</option>
                <option value="1">Member</option>
                <option value="3">Instructor</option>
              </select>
              <button type="submit" className="btn btn-primary">Create Account</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
