import React, { useEffect, useState } from "react";
import { getEmployees } from "../../services/api"; // Update the import path accordingly

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
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

  return (
    <div className="container mt-5">
      <h1>Employees</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Department</th>
            <th>Age</th>
            <th>Salary</th>
            <th>Experience</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
