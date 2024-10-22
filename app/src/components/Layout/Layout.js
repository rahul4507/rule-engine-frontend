import React from "react";
import { Link, useLocation } from "react-router-dom";
import LogoutButton from "../Auth/Logout"; // Import the LogoutButton component

const Layout = ({ children }) => {
  const location = useLocation(); // Get the current location

  // Determine if the current path is the login or signup page
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar, visible only if not on the auth pages */}
      {!isAuthPage && (
        <nav
          className="navbar navbar-expand-lg navbar-light bg-light"
          style={{
            height: "60px",
            padding: "0.5rem 1rem",
            borderBottom: "1px solid #ddd",
          }}
        >
          <div className="container-fluid">
            <Link
              className="navbar-brand"
              to="/"
              style={{ fontSize: "1.25rem" }}
            >
              Rule Engine
            </Link>
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
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/employees">
                    Employees
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/rules">
                    Rules
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/combine-rules">
                    Combine Rules
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/evaluate-rules">
                    Evaluate Rules
                  </Link>
                </li>
                <li className="nav-item ms-3">
                  {/* Add margin to separate Logout button */}
                  <LogoutButton /> {/* Add LogoutButton component here */}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}

      {/* Main content */}
      <div className="container flex-grow-1 py-4">{children}</div>

      {/* Footer fixed to the bottom */}
      {!isAuthPage && (
        <footer
          className="bg-light text-center text-lg-start py-2 mt-auto"
          style={{ borderTop: "1px solid #ddd", height: "50px" }}
        >
          <div className="container">
            <p className="text-center mb-0" style={{ fontSize: "0.9rem" }}>
              © 2024 Rule Engine. All Rights Reserved.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
