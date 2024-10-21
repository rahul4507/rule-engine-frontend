import React, { useEffect, useState } from "react";
import {
  getRules,
  createRule,
  updateRule,
  deleteRule,
} from "../../services/api"; // Update the import path accordingly
import "./RulesList.css"; // Assuming a consistent CSS file for all components

const RulesList = () => {
  const [rules, setRules] = useState([]); // Rules State
  const [newRule, setNewRule] = useState({ rule_string: "" }); // New Rule State
  const [editRule, setEditRule] = useState(null); // Edit Rule State
  const token = localStorage.getItem("token"); // Token for authentication

  // Fetch Rules on Component Mount
  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await getRules(token);
        setRules(response.data);
      } catch (error) {
        console.error("Error fetching rules", error);
      }
    };

    fetchRules();
  }, [token]);

  // Create New Rule
  const handleCreateRule = async () => {
    try {
      const response = await createRule(newRule, token);
      setRules([...rules, response.data]);
      setNewRule({ rule_string: "" }); // Reset input
    } catch (error) {
      console.error("Error creating rule", error);
    }
  };

  // Update Existing Rule
  const handleUpdateRule = async () => {
    try {
      const response = await updateRule(editRule.id, editRule, token);
      setRules(
        rules.map((rule) => (rule.id === editRule.id ? response.data : rule))
      );
      setEditRule(null); // Reset edit state
    } catch (error) {
      console.error("Error updating rule", error);
    }
  };

  // Delete Rule
  const handleDeleteRule = async (id) => {
    try {
      await deleteRule(id, token);
      setRules(rules.filter((rule) => rule.id !== id));
    } catch (error) {
      console.error("Error deleting rule", error);
    }
  };

  // Handle Input Change for New Rule or Edit Rule
  const handleInputChange = (e, setState) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="container">
      <h1 className="text-center mb-4">Rules</h1>

      {/* New Rule Form */}
      <div className="card p-4 mb-5">
        <h2 className="mb-4">Add New Rule</h2>
        <div className="row mb-3">
          <div className="col-md-12">
            <input
              type="text"
              name="rule_string"
              className="form-control"
              placeholder="Rule String"
              value={newRule.rule_string}
              onChange={(e) => handleInputChange(e, setNewRule)}
            />
          </div>
        </div>
        <button className="btn btn-success w-100" onClick={handleCreateRule}>
          Add Rule
        </button>
      </div>

      {/* Rules List */}
      <div className="card p-4">
        <h2 className="mb-4">Rule List</h2>
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Rule String</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((rule) => (
              <tr key={rule.id}>
                <td>{rule.id}</td>
                <td className="rule-string-cell">{rule.rule_string}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => setEditRule(rule)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteRule(rule.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Rule Form */}
      {editRule && (
        <div className="card p-4 mt-5">
          <h2 className="mb-4">Edit Rule</h2>
          <div className="row mb-3">
            <div className="col-md-12">
              <input
                type="text"
                name="rule_string"
                className="form-control"
                placeholder="Rule String"
                value={editRule.rule_string}
                onChange={(e) => handleInputChange(e, setEditRule)}
              />
            </div>
          </div>
          <button className="btn btn-warning w-100" onClick={handleUpdateRule}>
            Update Rule
          </button>
        </div>
      )}
    </div>
  );
};

export default RulesList;
