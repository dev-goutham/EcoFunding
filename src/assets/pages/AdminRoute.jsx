import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../config/AuthContext.js';

// Example with a single allowed UID
// This could also be an array of UIDs if
const allowedUIDs = ["EsanDapF1VQVartYTvCWUdVu3BB3", "REE95WSUXvRPzPa9kUTMJ86jbTf2", ""]; 
function AdminRoute({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser || !allowedUIDs.includes(currentUser.uid)) {
    // If there's no current user or the user's UID doesn't match the allowed UID
    return <Navigate to="/adminlogin" />;
  }

  return children;
}

export default AdminRoute;
