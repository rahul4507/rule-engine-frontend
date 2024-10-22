import React, { useState, useEffect } from "react";
import Tree from "react-d3-tree";

// Recursive function to transform your AST into the tree format required by react-d3-tree
const transformASTtoTreeData = (node) => {
  if (!node) return null;

  const transformedNode = {
    name: node.val, // Assuming each node has a 'val' field to represent its value
    children: [],
  };

  if (node.left) {
    transformedNode.children.push(transformASTtoTreeData(node.left));
  }

  if (node.right) {
    transformedNode.children.push(transformASTtoTreeData(node.right));
  }

  // Clean empty children array if node has no children
  if (transformedNode.children.length === 0) {
    delete transformedNode.children;
  }

  return transformedNode;
};

const TreeView = ({ ast }) => {
  const [treeData, setTreeData] = useState(null);

  useEffect(() => {
    if (ast) {
      const transformedTree = transformASTtoTreeData(ast);
      setTreeData([transformedTree]); // Set the tree data in the expected format for react-d3-tree
    }
  }, [ast]);

  if (!treeData) {
    return <div>No AST data available</div>;
  }

  return (
    <div className="tree-view-container" style={{ height: "500px" }}>
      {/* <h3>AST Visualization</h3> */}
      {/* Render the tree using react-d3-tree */}
      <Tree
        data={treeData}
        orientation="vertical" // You can switch between vertical or horizontal
        translate={{ x: 200, y: 50 }} // Adjust the starting position of the tree
        collapsible={false} // If you want to disable node collapsing
        pathFunc="diagonal" // Link style between nodes (diagonal is common)
        styles={{
          nodes: {
            node: { circle: { stroke: "blue", fill: "lightblue" } },
            leafNode: { circle: { stroke: "green", fill: "lightgreen" } },
          },
          links: { stroke: "black", strokeWidth: 2 },
        }}
      />
    </div>
  );
};

export default TreeView;
