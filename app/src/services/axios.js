import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/api/user",
});

// Function to attach the interceptors
export const setupInterceptors = (navigate) => {
  // Request interceptor to add token to headers
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor to handle errors
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // Handle different error scenarios
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const { status, data } = error.response;

        switch (status) {
          case 200:
            displaySuccess("Success!");
            break;
          case 201:
            displaySuccess("Success!");
            break;
          case 400: {
            // Handle Bad Request
            if (data && data.error) {
              // Single error message
              displayError(data.error);
            } else if (data) {
              // Handle multiple validation errors
              if (Array.isArray(data)) {
                // If data is an array of errors
                data.forEach((error) => displayError(error));
              } else {
                // If data is an object with key-value pairs of errors
                Object.entries(data).forEach(([field, message]) => {
                  if (Array.isArray(message)) {
                    // Handle case where each field might have multiple errors
                    message.forEach((error) =>
                      displayError(`${field}: ${error}`)
                    );
                  } else {
                    displayError(`${field}: ${message}`);
                  }
                });
              }
            } else {
              // Fallback for when no specific error data is provided
              displayError(
                "Bad Request: The server could not process your request."
              );
            }
            break;
          }

          case 401:
            // Handle Unauthorized
            localStorage.removeItem("token");
            localStorage.removeItem("refresh");
            navigate("/login");
            displayError("Session expired. Please log in again.");
            break;

          case 403:
            // Handle Forbidden
            displayError("You don't have permission to perform this action");
            break;

          case 404:
            // Handle Not Found
            displayError("Resource not found");
            break;

          case 500:
            // Handle Server Error
            displayError("An internal server error occurred");
            break;

          default:
            // Handle other status codes
            displayError("An error occurred. Please try again later.");
        }
      } else if (error.request) {
        // The request was made but no response was received
        displayError("No response received from server");
      } else {
        // Something happened in setting up the request that triggered an Error
        displayError("Error setting up the request");
      }

      return Promise.reject(error);
    }
  );
};

// Custom error display function
const displayError = (message) => {
  // Create error container if it doesn't exist
  let errorContainer = document.getElementById("error-container");
  if (!errorContainer) {
    errorContainer = document.createElement("div");
    errorContainer.id = "error-container";
    errorContainer.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
      max-width: 350px;
    `;
    document.body.appendChild(errorContainer);
  }

  // Create error message element
  const errorElement = document.createElement("div");
  errorElement.style.cssText = `
    background-color: #f8d7da;
    color: #721c24;
    padding: 1rem;
    margin-bottom: 10px;
    border: 1px solid #f5c6cb;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  // Add message and close button
  errorElement.innerHTML = `
    <span>${message}</span>
    <button style="
      background: none;
      border: none;
      color: #721c24;
      cursor: pointer;
      font-size: 1.2rem;
      padding: 0 5px;
    ">&times;</button>
  `;

  // Add close functionality
  const closeButton = errorElement.querySelector("button");
  closeButton.onclick = () => {
    errorElement.remove();
  };

  // Add to container
  errorContainer.appendChild(errorElement);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (errorElement.parentNode) {
      errorElement.remove();
    }
  }, 5000);
};

const displaySuccess = (message) => {
  // Create success container if it doesn't exist
  let successContainer = document.getElementById("success-container");
  if (!successContainer) {
    successContainer = document.createElement("div");
    successContainer.id = "success-container";
    successContainer.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
      max-width: 350px;
    `;
    document.body.appendChild(successContainer);
  }

  // Create success message element
  const successElement = document.createElement("div");
  successElement.style.cssText = `
    background-color: #d4edda;
    color: #155724;
    padding: 1rem;
    margin-bottom: 10px;
    border: 1px solid #c3e6cb;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  // Add message and close button
  successElement.innerHTML = `
    ${message}
    <button style="
      background: none;
      border: none;
      color: #155724;
      font-size: 1.25rem;
      cursor: pointer;
      padding: 0 0 0 1rem;
      line-height: 1;
    ">×</button>
  `;

  // Add close functionality
  const closeButton = successElement.querySelector("button");
  closeButton.onclick = () => {
    successElement.remove();
  };

  // Add to container
  successContainer.appendChild(successElement);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (successElement.parentNode) {
      successElement.remove();
    }
  }, 5000);
};

export default api;
