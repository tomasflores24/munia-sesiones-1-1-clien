import ProtectedRoutes from "./guards/ProtectedRoutes";
import PublicRouter from "./guards/PublicRouter";
import DashboardRoutes from "./DashboardRoutes/DashboardRoutes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "../pages/auth/sign-up/Register";
import SignIn from "../pages/auth/sign-in/SignIn";

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

        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
