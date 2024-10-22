// src/components/Auth/Login.js
import React, { useState } from "react";
import { login } from "../../services/api";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // To handle redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      console.log("Logged in successfully", response.data);
      localStorage.setItem("token", response.data.user.access);
      localStorage.setItem("refresh", response.data.user.refresh);
      navigate("/"); // Redirect to home page
    } catch (error) {
      console.error("Error logging in", error);
      // Handle error as needed, e.g., show a toast
    }
  };

  const handleSignup = () => {
    navigate("/signup"); // Navigate to signup page when signup button is clicked
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          {" "}
          {/* Increased width of the form */}
          <div
            className="card p-4"
            style={{ height: "auto", minHeight: "400px" }}
          >
            {" "}
            {/* Adjusted height */}
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 mb-3">
                Login
              </button>
              <button
                type="button"
                className="btn btn-secondary w-100"
                onClick={handleSignup}
              >
                Signup
              </button>
              {/* Add message prompting users to go to the signup page */}
              <p className="text-center mt-3">
                Don't have an account?{" "}
                <Link to="/signup" className="link-primary">
                  Go to Signup
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
