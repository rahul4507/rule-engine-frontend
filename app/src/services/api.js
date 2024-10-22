import api from "./axios"; // Import the Axios instance

export const login = (email, password) => {
  return api.post("/login/", { email, password });
};

export const logout = () => {
  const token = localStorage.getItem("refresh"); // Get token from localStorage
  return api.post("/logout/", { token });
};

export const register = (name, username, email, password) => {
  return api.post("/register/", { name, username, email, password });
};

// Employees API
export const getEmployees = () => {
  return api.get("/employees/");
};

export const getEmployeeDetail = (id) => {
  return api.get(`/employees/${id}/`);
};

export const createEmployee = (data) => {
  return api.post("/employees/", data);
};

export const updateEmployee = (id, data) => {
  return api.put(`/employees/${id}/`, data);
};

export const deleteEmployee = (id, token) => {
  return api.delete(`/employees/${id}/`);
};

// Rules API
export const getRules = () => {
  return api.get("/rules/");
};

export const createRule = (data) => {
  return api.post("/rules/", data);
};

export const updateRule = (id, data) => {
  return api.put(`/rules/${id}/`, data);
};

export const deleteRule = (id) => {
  return api.delete(`/rules/${id}/`);
};

export const evaluateRule = (employeeId, data) => {
  return api.post(`/employees/${employeeId}/evaluate/`, data);
};

export const combineRules = (rules) => {
  return api.post("/rules/combine/", { rules });
};

export const getRule = (ruleId) => {
  return api.get(`/rules/${ruleId}/ `);
};
