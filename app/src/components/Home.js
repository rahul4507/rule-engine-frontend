import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login if no token
    }
  }, [navigate]);
  return (
    <div>
      {/* Main content */}
      <div className="container text-center mt-5">
        <h1 className="mb-5">Welcome to Rule Engine</h1>

        <div className="row justify-content-center">
          {/* Employee Card */}
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div className="card h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Employees</h5>
                <p className="card-text">View and manage employees.</p>
                <Link to="/employees" className="btn btn-primary mt-auto">
                  Go to Employees
                </Link>
              </div>
            </div>
          </div>

          {/* Rules Card */}
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div className="card h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Rules</h5>
                <p className="card-text">View and manage rules.</p>
                <Link to="/rules" className="btn btn-primary mt-auto">
                  Go to Rules
                </Link>
              </div>
            </div>
          </div>

          {/* Combine Rules Card */}
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div className="card h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Combine Rules</h5>
                <p className="card-text">Combine multiple rules into one.</p>
                <Link to="/combine-rules" className="btn btn-primary mt-auto">
                  Combine Rules
                </Link>
              </div>
            </div>
          </div>

          {/* Evaluate Rules Card */}
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div className="card h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Evaluate Rules</h5>
                <p className="card-text">
                  Evaluate rules against employee data.
                </p>
                <Link to="/evaluate-rules" className="btn btn-primary mt-auto">
                  Evaluate Rules
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
