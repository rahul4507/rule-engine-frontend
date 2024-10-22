import React, { useState, useEffect } from "react";
import { getRules, combineRules } from "../../services/api"; // Import the API services

const CombineRules = () => {
  const [availableRules, setAvailableRules] = useState([]); // Available rules from API
  const [selectedRules, setSelectedRules] = useState([]); // Selected rules for combining
  const [isOpen, setIsOpen] = useState(false); // Dropdown open state
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    // Fetch available rules when the component mounts
    const fetchRules = async () => {
      try {
        const response = await getRules();
        setAvailableRules(response.data);
      } catch (error) {
        console.error("Error fetching rules", error);
      }
    };

    fetchRules();
  }, []);

  // Handle the combine rules action
  const handleCombineRules = async () => {
    try {
      const response = await combineRules(selectedRules);
      setResponseMessage("Rules combined successfully!");
    } catch (error) {
      setResponseMessage("Failed to combine rules.");
    }
  };

  // Handle rule selection from the dropdown
  const handleRuleSelection = (event) => {
    const ruleId = parseInt(event.target.value);
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedRules([...selectedRules, ruleId]);
    } else {
      setSelectedRules(selectedRules.filter((id) => id !== ruleId));
    }
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="container">
      <h2>Combine Rules</h2>
      <p>Select multiple rules to combine them into one.</p>

      {/* Dropdown for selecting rules */}
      <div className="dropdown mb-3">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          onClick={toggleDropdown}
        >
          Select Rules to Combine
        </button>
        {isOpen && (
          <div className="dropdown-menu show">
            {availableRules.map((rule) => (
              <div key={rule.id} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`rule_${rule.id}`}
                  value={rule.id}
                  checked={selectedRules.includes(rule.id)}
                  onChange={handleRuleSelection}
                />
                <label className="form-check-label" htmlFor={`rule_${rule.id}`}>
                  {rule.name} - {rule.id}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <button className="btn btn-primary" onClick={handleCombineRules}>
        Combine Rules
      </button>

      {responseMessage && <p className="mt-3">{responseMessage}</p>}

      {/* Display selected rules */}
      <div style={{ marginTop: "20px" }}>
        <h4>Selected Rules:</h4>
        <ul>
          {selectedRules.map((ruleId) => (
            <li key={ruleId}>
              {availableRules.find((rule) => rule.id === ruleId)?.name} -{" "}
              {ruleId}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CombineRules;
