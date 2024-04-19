

export function CreateUser() {


  const handleSubmitUser = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    axios.post("http://[::1]:3000/users.json", formData)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("flashMessage", "Thank you for signing up");
        event.target.reset();
        window.location.href = '/';
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
            <h5 className="modal-title">Create Account</h5>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmitUser}>
              <input name="name" onChange={(event) => setName(event.target.value)} className="form-control mb-3" placeholder="Name" required />
              <small>{20 - name.length} characters remaining</small>
              <input name="email" type="email" className="form-control mb-3" placeholder="Email" required />
              <input name="password" type="password" className="form-control mb-3" placeholder="Password" required />
              <input name="password_confirmation" type="password" className="form-control mb-3" placeholder="Confirm Password" required />
              <button type="submit" className="btn btn-primary">Create Account</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
