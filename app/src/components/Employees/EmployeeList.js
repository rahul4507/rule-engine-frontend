import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../../services/api";
import "./EmployeeList.css"; // Import the CSS

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    age: "",
    department: "",
    salary: "",
    experience: "",
  });
  const [editEmployee, setEditEmployee] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // State to manage modal visibility

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getEmployees();
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees", error);
      }
    };

    fetchEmployees();
  }, []);

  // Create Employee
  const handleCreateEmployee = async () => {
    try {
      const response = await createEmployee(newEmployee);
      setEmployees([...employees, response.data]);
      setNewEmployee({
        name: "",
        age: "",
        department: "",
        salary: "",
        experience: "",
      }); // Reset newEmployee state
    } catch (error) {
      console.error("Error creating employee", error);
    }
  };

  // Open edit modal and set the selected employee
  const openEditModal = (employee) => {
    setEditEmployee(employee);
    setModalVisible(true); // Open modal
  };

  // Close modal handler
  const closeModal = () => {
    setModalVisible(false); // Close modal
    setEditEmployee(null); // Reset the edit employee
  };

  // Update Employee
  const handleUpdateEmployee = async () => {
    try {
      const response = await updateEmployee(editEmployee.id, editEmployee);
      setEmployees(
        employees.map((emp) =>
          emp.id === editEmployee.id ? response.data : emp
        )
      );
      closeModal(); // Close the modal after updating
    } catch (error) {
      console.error("Error updating employee", error);
    }
  };

  // Delete Employee
  const handleDeleteEmployee = async (id) => {
    try {
      await deleteEmployee(id);
      setEmployees(employees.filter((emp) => emp.id !== id));
    } catch (error) {
      console.error("Error deleting employee", error);
    }
  };

  return (
    <div className="container">
      <h1>Employees</h1>

      {/* New Employee Form */}
      <div className="card p-4 mb-5">
        <h2>Add New Employee</h2>
        <div className="row">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={newEmployee.name}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, name: e.target.value })
              }
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Age"
              value={newEmployee.age}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, age: e.target.value })
              }
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Department"
              value={newEmployee.department}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, department: e.target.value })
              }
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Salary"
              value={newEmployee.salary}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, salary: e.target.value })
              }
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Experience"
              value={newEmployee.experience}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, experience: e.target.value })
              }
            />
          </div>
        </div>
        <button
          className="btn btn-success w-100"
          onClick={handleCreateEmployee}
        >
          Add Employee
        </button>
      </div>

      {/* Employee List */}
      <div className="card p-4">
        <h2>Employee List</h2>
        <table className="table table-hover employee-table">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Age</th>
              <th>Salary</th>
              <th>Experience</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.department}</td>
                <td>{employee.age}</td>
                <td>{employee.salary}</td>
                <td>{employee.experience}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => openEditModal(employee)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm me-2"
                    onClick={() => handleDeleteEmployee(employee.id)}
                  >
                    Delete
                  </button>
                  <Link
                    className="btn btn-info btn-sm"
                    to={`/employees/${employee.id}`}
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Employee Modal */}
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
                <h5 className="modal-title">Edit Employee</h5>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      value={editEmployee.name}
                      onChange={(e) =>
                        setEditEmployee({
                          ...editEmployee,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Age"
                      value={editEmployee.age}
                      onChange={(e) =>
                        setEditEmployee({
                          ...editEmployee,
                          age: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-6 mt-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Department"
                      value={editEmployee.department}
                      onChange={(e) =>
                        setEditEmployee({
                          ...editEmployee,
                          department: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-6 mt-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Salary"
                      value={editEmployee.salary}
                      onChange={(e) =>
                        setEditEmployee({
                          ...editEmployee,
                          salary: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-6 mt-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Experience"
                      value={editEmployee.experience}
                      onChange={(e) =>
                        setEditEmployee({
                          ...editEmployee,
                          experience: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-warning"
                  onClick={handleUpdateEmployee}
                >
                  Update
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

export default EmployeeList;
