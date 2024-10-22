import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import { getEmployeeDetail, getRules, evaluateRule } from "../../services/api"; // Import the necessary APIs

const EmployeeDetail = () => {
  const { id: employeeId } = useParams(); // Get the employee ID from URL params
  const [employee, setEmployee] = useState(null);
  const [rules, setRules] = useState([]); // Initialize rules with an empty array
  const [selectedRule, setSelectedRule] = useState("");
  const [evaluationResult, setEvaluationResult] = useState("");

  // Fetch employee details
  useEffect(() => {
    const fetchEmployeeDetail = async () => {
      try {
        const response = await getEmployeeDetail(employeeId);
        setEmployee(response.data);
      } catch (error) {
        console.error("Error fetching employee details", error);
      }
    };
    fetchEmployeeDetail();
  }, [employeeId]);

  // Fetch rules for the dropdown
  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await getRules();
        setRules(response.data); // Set the rules from the API response
      } catch (error) {
        console.error("Error fetching rules", error);
      }
    };
    fetchRules();
  }, []);

  // Handle rule evaluation
  const handleEvaluate = async () => {
    try {
      const response = await evaluateRule(employeeId, { rule: selectedRule }); // Ensure you pass the rule object
      const result = response.data.result; // Adjust based on the actual response structure
      setEvaluationResult(`Evaluation Result: ${result}`);
    } catch (error) {
      setEvaluationResult("Error evaluating rule.");
    }
  };

  return (
    <div className="container mt-5">
      {employee ? (
        <div className="card">
          <div className="card-header">
            <h2>Employee Details</h2>
          </div>
          <div className="card-body">
            <ul className="list-group mb-4">
              <li className="list-group-item">
                <strong>ID:</strong> {employee.id}
              </li>
              <li className="list-group-item">
                <strong>Age:</strong> {employee.age}
              </li>
              <li className="list-group-item">
                <strong>Department:</strong> {employee.department}
              </li>
              <li className="list-group-item">
                <strong>Salary:</strong> ${employee.salary.toLocaleString()}{" "}
                {/* Format salary with commas */}
              </li>
              <li className="list-group-item">
                <strong>Experience:</strong> {employee.experience} years
              </li>
            </ul>

            <h3>Evaluate Rule</h3>
            <div className="mb-3">
              <label htmlFor="ruleSelect" className="form-label">
                Select Rule
              </label>
              <select
                id="ruleSelect"
                className="form-select"
                value={selectedRule}
                onChange={(e) => setSelectedRule(e.target.value)}
              >
                <option value="">Select a rule</option>
                {rules.map((rule) => (
                  <option key={rule.id} value={rule.id}>
                    {rule.name} {/* Display rule name */}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn btn-primary" onClick={handleEvaluate}>
              Evaluate Rule
            </button>

            {evaluationResult && <p className="mt-3">{evaluationResult}</p>}
          </div>
        </div>
      ) : (
        <p>Loading employee details...</p>
      )}
    </div>
  );
};

export default EmployeeDetail;
