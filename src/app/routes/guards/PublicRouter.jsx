import { Navigate } from "react-router-dom";

const PublicRouter = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/dashboard/" />;
};

export default PublicRouter;
