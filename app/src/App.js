import "./App.css";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./components/Home";
import EmployeeList from "./components/Employees/EmployeeList";
import Ruleslist from "./components/Rules/Ruleslist";
import CombineRules from "./components/CombineRules/CombineRules";
import EvaluateRules from "./components/EvaluateRules/EvaluateRules";
import Layout from "./components/Layout/Layout"; // Import the Layout component
import EmployeeDetail from "./components/EmployeeDetail/EmployeeDetail";
import { setupInterceptors } from "./services/axios"; // Import Axios interceptor setup
import RuleDetails from "./components/RuleDetails/RuleDetails";


import React from "react";

function App() {
  const navigate = useNavigate();

  // Set up Axios interceptors to handle 401 errors and redirect
  useEffect(() => {
    setupInterceptors(navigate);
  }, [navigate]);

  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/rules" element={<Ruleslist />} />
        <Route path="/combine-rules" element={<CombineRules />} />
        <Route path="/evaluate-rules" element={<EvaluateRules />} />
        <Route path="/employees/:id" element={<EmployeeDetail />} />
        <Route path="/rule-details/:ruleId" element={<RuleDetails />} />
      </Routes>
      {/* {location.pathname !== "/login" && location.pathname !== "/signup"} */}
    </Layout>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
