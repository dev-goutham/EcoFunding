import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../config/AuthContext.js';

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // User is not signed in, redirect them to your login page
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
