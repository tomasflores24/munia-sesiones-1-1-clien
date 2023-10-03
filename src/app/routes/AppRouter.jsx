import ProtectedRoutes from "./guards/ProtectedRoutes";
import PublicRouter from "./guards/PublicRouter";
import DashboardRoutes from "./DashboardRoutes/DashboardRoutes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "../pages/auth/sign-in/SignIn";
import SignUp2 from "../pages/auth/sign-up2/SignUp2";

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
        <Route path="/" element= {
        <PublicRouter>
          <SignIn/>
        </PublicRouter>
       } />
        <Route path="/register" element={<PublicRouter><SignUp2 /></PublicRouter>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
