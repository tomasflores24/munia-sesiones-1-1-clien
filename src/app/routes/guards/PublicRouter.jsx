import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const PublicRouter = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/dashboard/home" />;
};
PublicRouter.propTypes = {
  children: PropTypes.node,
};

export default PublicRouter;
