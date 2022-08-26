import React from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

const PrivateRoute = ({ children, path }) => {
  const { currentUser } = useAuth();

  if (currentUser && path === "/login") {
    return <Navigate to="/" />;
  } else if (!currentUser && path !== "/login") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
