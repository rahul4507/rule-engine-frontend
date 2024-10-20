// src/components/Auth/Login.js
import React, { useState } from "react";
import { login } from "../../services/api";
import { useNavigate } from "react-router-dom";

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
        <div className="col-md-6 col-lg-4">
          <div className="card p-4">
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
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
              <button
                type="button"
                className="btn btn-secondary w-100 mt-3"
                onClick={handleSignup}
              >
                Signup
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
