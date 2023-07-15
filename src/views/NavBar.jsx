const React = require('react');

function NavbBar({ username }) {
  return (
    <div className="container">
      {username ? (
        <nav className="navbar navbar-expand-xl">
          <div className="container-fluid d-flex justify-content-between">
            <a className="navbar-brand" href="/"><img src="https://cdn-icons-png.flaticon.com/32/3342/3342137.png" /></a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
              <form className="d-flex my_form_search justify-content-end" id="formReq" role="search">
                <input className="my_form-control me-2" type="search" name="userRequest" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-secondary" type="submit">Search</button>
              </form>
              <div className="title_username">{username}</div>
              <ul className="navbar-nav d-flex align-items-center">
                <li className="nav-item">
                  <a className="nav-link avatar" href="/private"><img src="/images/avatar.svg" /></a>
                </li>
                <li className="nav-item">/</li>
                <li className="nav-item">
                  <a className="nav-link" href="/auth/signout">Log out</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      ) : (
        <nav className="navbar navbar-expand-xl">
          <div className="container-fluid d-flex justify-content-between">
            <a className="navbar-brand" href="/"><img src="https://cdn-icons-png.flaticon.com/32/3342/3342137.png" /></a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
              <ul className="navbar-nav d-flex align-items-center">
                <li className="nav-item">
                  <a className="nav-link" href="/auth/signin">Log in</a>
                </li>
                <li className="nav-item">/</li>
                <li className="nav-item">
                  <a className="nav-link" href="/auth/signup">Sign up</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}

    </div>
  );
}

module.exports = NavbBar;
