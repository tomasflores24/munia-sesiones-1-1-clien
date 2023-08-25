import { Navigate, Outlet } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({children, isAllowed}) => {

    console.log(isAllowed)
    if (!isAllowed) return <Navigate to="/user/register" />
    return children ? children : <Outlet />;
};

export default ProtectedRoute