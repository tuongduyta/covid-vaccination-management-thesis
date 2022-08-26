import React from "react";

import { useAuth } from "../../contexts/AuthContext";

const PrivateComponent = ({ children }) => {
  const { currentUser } = useAuth();
  if (!currentUser) return null;
  return children;
};

export default PrivateComponent;
