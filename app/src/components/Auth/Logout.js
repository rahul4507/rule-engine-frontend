import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/api";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.setItem("token", null);
      localStorage.removeItem("refresh-token"); // Clear the token from localStorage
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button onClick={handleLogout} className="btn btn-danger border-top-0 m-0">
      Logout
    </button>
  );
};

export default LogoutButton;
