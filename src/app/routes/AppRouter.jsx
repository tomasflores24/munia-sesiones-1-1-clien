import ProtectedRoutes from "./guards/ProtectedRoutes";
// import PublicRouter from "./guards/PublicRouter";
import DashboardRoutes from "./DashboardRoutes/DashboardRoutes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "../pages/auth/sign-up/Register";
import Agenda from "../components/Agenda/Agenda";
import SignIn from "../pages/auth/sign-in/SignIn";
import CreateCompany from "../components/CreateCompany/CreateCompany";

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
        <Route path='/createCompany' element={<CreateCompany />} />
        <Route path="/" element={<SignIn />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/agenda" element={<Agenda />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
