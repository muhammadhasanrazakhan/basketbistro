import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
//import useAuth from '../../../hooks/useAuth';
import PreLoader from '../../SharedComponents/PreLoader/PreLoader';
import { useDispatch, useSelector } from "react-redux";

const RequiredAuth = ({ children, ...rest }) => {
  //const { loggedInUser, isLoading } = useAuth();
  const { loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  let location = useLocation();

  if (loading) {
    return <PreLoader />;
  }

  if (isAuthenticated) {
    return children;
  }

  return <Navigate to='/login' state={{ from: location }} />;
};

export default RequiredAuth;
