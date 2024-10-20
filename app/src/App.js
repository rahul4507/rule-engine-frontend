import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./components/Home";
import EmployeeList from "./components/Employees/EmployeeList";
import Ruleslist from "./components/Rules/Ruleslist";

import React from "react";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/rules" element={<Ruleslist />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
