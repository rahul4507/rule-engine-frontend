import React, { useEffect, useState } from "react";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../../services/api"; // Update the import path accordingly
import "./EmployeeList.css"; // Make sure to import the CSS file

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    age: "",
    department: "",
    salary: "",
    experience: "",
  });
  const [editEmployee, setEditEmployee] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getEmployees(token);
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees", error);
      }
    };

    fetchEmployees();
  }, [token]);

  // Create Employee
  const handleCreateEmployee = async () => {
    try {
      const response = await createEmployee(newEmployee, token);
      setEmployees([...employees, response.data]);
      setNewEmployee({ age: "", department: "", salary: "", experience: "" });
    } catch (error) {
      console.error("Error creating employee", error);
    }
  };

  // Update Employee
  const handleUpdateEmployee = async () => {
    try {
      const response = await updateEmployee(
        editEmployee.id,
        editEmployee,
        token
      );
      setEmployees(
        employees.map((emp) =>
          emp.id === editEmployee.id ? response.data : emp
        )
      );
      setEditEmployee(null);
    } catch (error) {
      console.error("Error updating employee", error);
    }
  };

  // Delete Employee
  const handleDeleteEmployee = async (id) => {
    try {
      await deleteEmployee(id, token);
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
              <th>ID</th>
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
                <td>{employee.id}</td>
                <td>{employee.department}</td>
                <td>{employee.age}</td>
                <td>{employee.salary}</td>
                <td>{employee.experience}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => setEditEmployee(employee)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteEmployee(employee.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Employee Form */}
      {editEmployee && (
        <div className="card p-4 mt-5">
          <h2>Edit Employee</h2>
          <div className="row">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Age"
                value={editEmployee.age}
                onChange={(e) =>
                  setEditEmployee({ ...editEmployee, age: e.target.value })
                }
              />
            </div>
            <div className="col-md-3">
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
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Salary"
                value={editEmployee.salary}
                onChange={(e) =>
                  setEditEmployee({ ...editEmployee, salary: e.target.value })
                }
              />
            </div>
            <div className="col-md-3">
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
          <button
            className="btn btn-warning w-100"
            onClick={handleUpdateEmployee}
          >
            Update Employee
          </button>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
