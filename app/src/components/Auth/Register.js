import React, { useState } from "react";
import { register } from "../../services/api";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(
        formData.name,
        formData.username,
        formData.email,
        formData.password
      );
      console.log("User registered successfully", response.data);
      navigate("/login"); // Redirect to login page after successful registration
    } catch (error) {
      console.error("Error registering user", error);
      // Optionally handle error display (e.g., toast notifications)
    }
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
            <h2 className="text-center mb-4">Register</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username:
                </label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 mb-3">
                Register
              </button>
              {/* Add message prompting users to go to the login page */}
              <p className="text-center">
                Already have an account?{" "}
                <Link to="/login" className="link-primary">
                  Go to Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
