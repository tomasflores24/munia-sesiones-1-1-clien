import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedRoutes = ({children}) => {
  const { userTypeId } = useSelector((state) => state.auth.user);
  if(userTypeId !== 4){
    return <Navigate to="/"/>  
  }
  return children ? children : <Outlet />
};

export default ProtectedRoutes;
