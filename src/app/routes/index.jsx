import { Route, Routes } from "react-router-dom";
import Register from "../components/register/register";
// Importa más páginas si es necesario

function AppRoutes() {
  return (
    <Routes>
      {/* ejemplo */}
      <Route path="/user/register" element={<Register />} />
      {/* Agregar más rutas aca */}
    </Routes>
  );
}

export default AppRoutes;
