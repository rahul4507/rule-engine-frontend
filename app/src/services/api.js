// src/services/api.js
import axios from "axios";

const API_URL = "http://localhost:8000/api/user";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = (email, password) => {
  return api.post("/login/", { email, password });
};

export const register = (name, username, email, password) => {
  return api.post("/register/", { name, username, email, password });
};

// / Employees API
export const getEmployees = (token) => {
  return api.get("/employees/", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createEmployee = (data, token) => {
  return api.post("/employees/", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateEmployee = (id, data, token) => {
  return api.put(`/employees/${id}/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteEmployee = (id, token) => {
  return api.delete(`/employees/${id}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Rules API
export const getRules = (token) => {
  return api.get("/rules/", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createRule = (data, token) => {
  return api.post("/rules/", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateRule = (id, data, token) => {
  return api.put(`/rules/${id}/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteRule = (id, token) => {
  return api.delete(`/rules/${id}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};