import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
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
    </div>
  );
};

export default Home;
