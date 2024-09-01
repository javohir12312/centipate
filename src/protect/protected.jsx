import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUserData } from '../utils/auth';

const ProtectedRoute = ({ children }) => {
  const user = getUserData();
  
  if (!user || !user.id) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
