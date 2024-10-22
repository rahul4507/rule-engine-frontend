import React, { useEffect, useState } from "react";
import { getRule } from "../../services/api"; // Ensure getRules fetches the specific rule by ID
import { useParams } from "react-router-dom";
import TreeView from "../TreeView"; // Import your tree component

const RuleDetails = () => {
  const { ruleId } = useParams();
  const [rule, setRule] = useState(null);

  useEffect(() => {
    const fetchRule = async () => {
      try {
        const response = await getRule(ruleId);
        setRule(response.data);
      } catch (error) {
        console.error("Error fetching rule details", error);
      }
    };

    fetchRule();
  }, [ruleId]);

  if (!rule) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container rule-details">
      <h1>Rule Details</h1>
      <p>
        <strong>Name:</strong> {rule.name}
      </p>
      <p>
        <strong>Description:</strong> {rule.description}
      </p>
      <p>
        <strong>Created Date:</strong>{" "}
        {new Date(rule.created_date).toLocaleDateString()}
      </p>
      <p>
        <strong>Rule String:</strong> {rule.rule_string}
      </p>
      <br></br>
      <h2>AST Tree</h2>
      <TreeView ast={rule.ast} /> {/* Pass the AST data to TreeView */}
    </div>
  );
};

export default RuleDetails;
