import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuthContext } from '../context/UserAuthContext';

const ProtectedRoute = ({ element }) => {
  const { token } = useContext(UserAuthContext);

  if (!token) {
    // Redirect to the sign-in page if not authenticated
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoute;
