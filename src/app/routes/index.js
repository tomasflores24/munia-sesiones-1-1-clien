import { Route, Routes } from "react-router-dom";
import SideBar from "../components/register/sideBar/sideBar";
// Importa más páginas si es necesario

function AppRoutes() {
  return (
    <Routes>
      {/* ejemplo */}
      {/* <Route path="/" element={<HomePage />} /> */}
      {/* Agregar más rutas aca */}
      <Route path="/dashboard" element={<SideBar/>} />
    </Routes>
  );
}

export default AppRoutes;
