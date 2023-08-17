import { Routes,Route } from "react-router-dom";
import Table from "../components/Table/Table";
// Importa más páginas si es necesario

function AppRoutes() {
  return (
    <Routes>
      {/* ejemplo */}
      {/* <Route path="/" element={<HomePage />} /> */}
      <Route path="/Table" element={<Table />} /> 
      {/* Agregar más rutas aca */}
    </Routes>
  );
}

export default AppRoutes;
