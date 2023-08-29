import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({children}) => {
  const { userTypeId } = useSelector((state) => state.auth.user);
  if(userTypeId !== 4){
    return <Navigate to="/"/>  
  }
  return children ? children : <Outlet />
};

export default ProtectedRoutes;
