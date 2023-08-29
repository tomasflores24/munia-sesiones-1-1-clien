import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoutes = ({children}) => {
  const { userTypeId } = useSelector((state) => state.auth.user);
  if(userTypeId !== 4){
    return <Navigate to="/"/>  
  }
  return children ? children : <Outlet />
};


ProtectedRoutes.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRoutes;
