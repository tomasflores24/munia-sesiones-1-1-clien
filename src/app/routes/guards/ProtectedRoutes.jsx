import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

// eslint-disable-next-line react/prop-types
const ProtectedRoutes = ({ children }) => {
  const {isAuthenticated} = useSelector((state) => state.auth.auth);
 
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return children ? children : <Outlet />;
};

ProtectedRoutes.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRoutes;
