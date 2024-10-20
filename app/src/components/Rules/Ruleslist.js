import React, { useEffect, useState } from "react";
import { getRules } from "../../services/api";

const Ruleslist = () => {
  const [rules, setRules] = useState([]);
  const token = localStorage.getItem("token");

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
  }, []);

  return (
    <div className="container mt-5">
      <h1>Rules</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Rule String</th>
            {/* <th>AST</th> */}
          </tr>
        </thead>
        <tbody>
          {rules.map((rule) => (
            <tr key={rule.id}>
              <td>{rule.id}</td>
              <td>{rule.rule_string}</td>
              {/* <td>{rule.ast}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ruleslist;
