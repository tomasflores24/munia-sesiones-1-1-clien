import ProtectedRoutes from "./guards/ProtectedRoutes";
// import PublicRouter from "./guards/PublicRouter";
import DashboardRoutes from "./DashboardRoutes/DashboardRoutes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "../pages/auth/sign-in/SignIn";
import SignUp2 from "../pages/auth/sign-up2/SignUp2";
import Comments from "../pages/comments/Comments"


const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoutes>
              <DashboardRoutes />
            </ProtectedRoutes>
          }
        />
        <Route path="/" element= {<SignIn/>} />
        <Route path="/register" element={<SignUp2 />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
