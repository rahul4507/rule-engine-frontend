import React, { useEffect, useState } from "react";
import { getEmployees, getRules, evaluateRule } from "../../services/api"; // Update the import path accordingly

const EvaluateRules = () => {
  const [employees, setEmployees] = useState([]);
  const [rules, setRules] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [selectedRuleId, setSelectedRuleId] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [messageColor, setMessageColor] = useState(""); // State for message color
  const [modalVisible, setModalVisible] = useState(false); // State to manage modal visibility

  // Fetch employees and rules on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeeResponse = await getEmployees();
        setEmployees(employeeResponse.data);

        const ruleResponse = await getRules();
        setRules(ruleResponse.data);
      } catch (error) {
        console.error("Error fetching employees or rules:", error);
      }
    };
    fetchData();
  }, []);

  // Handle rule evaluation
  const handleEvaluateRule = async () => {
    try {
      const response = await evaluateRule(selectedEmployeeId, {
        rule: selectedRuleId,
      });
      if (response.data.status) {
        setResponseMessage("Rule Passed!");
        setMessageColor("green"); // Set color for success
      } else {
        setResponseMessage("Rule Not Passed.");
        setMessageColor("red"); // Set color for failure
      }
    } catch (error) {
      setResponseMessage("Failed to evaluate rule.");
      setMessageColor("red"); // Set color for failure
    } finally {
      setModalVisible(true); // Show modal after evaluation
    }
  };

  // Close modal handler
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="container mt-5">
      <h2>Evaluate Rules</h2>
      <p>Evaluate a rule against an employee's data.</p>

      <div className="mb-4">
        <label htmlFor="employeeSelect" className="form-label">
          Select Employee
        </label>
        <select
          id="employeeSelect"
          className="form-select"
          value={selectedEmployeeId}
          onChange={(e) => setSelectedEmployeeId(e.target.value)}
        >
          <option value="">Select an employee</option>
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.name}{" "}
              {/* Adjust this according to the employee object */}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="ruleSelect" className="form-label">
          Select Rule
        </label>
        <select
          id="ruleSelect"
          className="form-select"
          value={selectedRuleId}
          onChange={(e) => setSelectedRuleId(e.target.value)}
        >
          <option value="">Select a rule</option>
          {rules.map((rule) => (
            <option key={rule.id} value={rule.id}>
              {rule.name} {/* Adjust this according to the rule object */}
            </option>
          ))}
        </select>
      </div>

      <button className="btn btn-primary" onClick={handleEvaluateRule}>
        Evaluate Rule
      </button>

      {/* Bootstrap Modal */}
      {modalVisible && (
        <div
          className="modal fade show"
          style={{ display: "block", zIndex: 1050 }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-center">Evaluation Result</h5>
              </div>
              <div className="modal-body">
                <p
                  style={{
                    color: messageColor,
                    textAlign: "center",
                    fontSize: "1.2rem",
                  }}
                >
                  {responseMessage}
                </p>
              </div>
              <div className="modal-footer justify-content-center">
                <button
                  type="button"
                  className="btn btn-primary" // Set OK button to primary
                  onClick={closeModal}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvaluateRules;
