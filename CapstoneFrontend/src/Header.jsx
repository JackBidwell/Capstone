import { Link } from "react-router-dom";

export function Header() {

  const isLoggedIn = !!localStorage.getItem('jwt');

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <h1 className="navbar-brand" href="#">Welcome! {isLoggedIn && localStorage.name}</h1>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li>
              <Link to="/CreateUser" className="navbar nav-link">Sing Up</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
