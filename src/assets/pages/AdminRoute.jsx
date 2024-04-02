import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../config/AuthContext.js';

function AdminRoute({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // User is not signed in, redirect them to your login page
    return <Navigate to="/adminlogin" />;
  }

  return children;
}

export default AdminRoute;
