import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            MyApp
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="container mt-5 text-center">
        <h1>Welcome to the Home Page</h1>
        <p>This is the home page after logging in.</p>

        <div className="row">
          {/* Employee Card */}
          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Employees</h5>
                <p className="card-text">View and manage employees.</p>
                <Link to="/employees" className="btn btn-primary">
                  Go to Employees
                </Link>
              </div>
            </div>
          </div>

          {/* Rules Card */}
          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Rules</h5>
                <p className="card-text">View and manage rules.</p>
                <Link to="/rules" className="btn btn-primary">
                  Go to Rules
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-light text-center text-lg-start mt-5">
        <div className="container p-4">
          <p className="text-center">© 2024 MyApp. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
