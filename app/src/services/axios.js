import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/user/", // Your API base URL
});

// Function to attach the interceptors
export const setupInterceptors = (navigate) => {
  // console.log("Setting up interceptors");

  // Request interceptor to add token to headers
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token"); // Get token from localStorage
      // console.log("Token retrieved:", token); // Log the token for debugging

      if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Attach token if available
      }

      // Log the API call details
      // console.log(
      //   `Making ${config.method.toUpperCase()} request to ${config.url}`
      // );
      return config; // Return the modified config
    },
    (error) => {
      return Promise.reject(error); // Handle request error
    }
  );

  // Response interceptor to handle 401 errors
  api.interceptors.response.use(
    (response) => {
      return response; // Return the response if it's successful
    },
    (error) => {
      // If it's a 401 Unauthorized error
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token"); // Clear the token from localStorage
        localStorage.removeItem("refresh"); // Clear the token from localStorage
        navigate("/login"); // Redirect to login page
        alert("Session expired. Please log in again."); // Optional alert for user feedback
      }
      return Promise.reject(error); // Forward the error for further handling
    }
  );
};

export default api;
