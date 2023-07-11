import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
//import useAuth from '../../../hooks/useAuth';
import PreLoader from '../../SharedComponents/PreLoader/PreLoader';
import { useDispatch, useSelector } from "react-redux";

const IsAdmin = ({ children, ...rest }) => {
  //const { loggedInUser, isLoading, isAdmin } = useAuth();
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  let location = useLocation();

  if (loading) {
    return <PreLoader />;
  }

  if (isAuthenticated && user?.role === "admin") {
    return children;
  }

  return <Navigate to='/login' state={{ from: location }} />;
};

export default IsAdmin;
