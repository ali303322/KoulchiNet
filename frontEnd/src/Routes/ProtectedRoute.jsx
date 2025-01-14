import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, rolesRequired }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Check if the user is authenticated
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Check if the user has one of the required roles
  if (rolesRequired && !rolesRequired.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children; // Render the protected content
};

// Define PropTypes for validation
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  rolesRequired: PropTypes.arrayOf(PropTypes.string), // Validate as an array of strings
};

export default ProtectedRoute;
