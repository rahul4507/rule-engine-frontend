import React, { useEffect, useState } from "react";
import {
  getRules,
  createRule,
  updateRule,
  deleteRule,
} from "../../services/api";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./RulesList.css";

const RulesList = () => {
  const [rules, setRules] = useState([]);
  const [newRule, setNewRule] = useState({
    rule_string: "",
    name: "",
    description: "",
    created_date: "",
  });
  const [editRule, setEditRule] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const navigate = useNavigate(); // Initialize navigate for redirection

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await getRules();
        setRules(response.data);
      } catch (error) {
        console.error("Error fetching rules", error);
      }
    };

    fetchRules();
  }, []);

  const handleCreateRule = async () => {
    try {
      const response = await createRule(newRule);
      setRules([...rules, response.data]);
      setNewRule({
        rule_string: "",
        name: "",
        description: "",
        created_date: "",
      });
    } catch (error) {
      console.error("Error creating rule", error);
    }
  };

  const handleUpdateRule = async () => {
    try {
      const response = await updateRule(editRule.id, editRule);
      setRules(
        rules.map((rule) => (rule.id === editRule.id ? response.data : rule))
      );
      closeModal(); // Close the modal after update
    } catch (error) {
      console.error("Error updating rule", error);
    }
  };

  const handleDeleteRule = async (id) => {
    try {
      await deleteRule(id);
      setRules(rules.filter((rule) => rule.id !== id));
    } catch (error) {
      console.error("Error deleting rule", error);
    }
  };

  const handleInputChange = (e, setState) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Open modal and set selected rule for editing
  const openEditModal = (rule) => {
    setEditRule(rule);
    setModalVisible(true); // Show modal
  };

  // Close modal
  const closeModal = () => {
    setModalVisible(false); // Hide modal
    setEditRule(null); // Reset edit state
  };

  // Navigate to Rule Details page
  const handleViewDetails = (ruleId) => {
    navigate(`/rule-details/${ruleId}`); // Navigate to rule details page
  };

  return (
    <div className="container">
      <h1 className="text-center mb-4">Rules</h1>

      {/* New Rule Form */}
      <div className="card p-4 mb-5">
        <h2 className="mb-4">Add New Rule</h2>
        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="text"
              name="rule_string"
              className="form-control"
              placeholder="Rule String"
              value={newRule.rule_string}
              onChange={(e) => handleInputChange(e, setNewRule)}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              value={newRule.name}
              onChange={(e) => handleInputChange(e, setNewRule)}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-12">
            <textarea
              name="description"
              className="form-control"
              placeholder="Description"
              value={newRule.description}
              onChange={(e) => handleInputChange(e, setNewRule)}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="date"
              name="created_date"
              className="form-control"
              value={newRule.created_date}
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
              <th>Rule String</th>
              <th>Name</th>
              <th>Description</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((rule) => (
              <tr key={rule.id}>
                <td className="rule-string-cell">{rule.rule_string}</td>
                <td>{rule.name}</td>
                <td>{rule.description}</td>
                <td>{new Date(rule.created_date).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => openEditModal(rule)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm me-2"
                    onClick={() => handleDeleteRule(rule.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => handleViewDetails(rule.id)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Rule Modal */}
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
                <h5 className="modal-title">Edit Rule</h5>
              </div>
              <div className="modal-body">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="rule_string"
                      className="form-control"
                      placeholder="Rule String"
                      value={editRule.rule_string}
                      onChange={(e) => handleInputChange(e, setEditRule)}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Name"
                      value={editRule.name}
                      onChange={(e) => handleInputChange(e, setEditRule)}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <textarea
                      name="description"
                      className="form-control"
                      placeholder="Description"
                      value={editRule.description}
                      onChange={(e) => handleInputChange(e, setEditRule)}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <input
                      type="date"
                      name="created_date"
                      className="form-control"
                      value={editRule.created_date}
                      onChange={(e) => handleInputChange(e, setEditRule)}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-warning" onClick={handleUpdateRule}>
                  Update Rule
                </button>
                <button className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RulesList;
