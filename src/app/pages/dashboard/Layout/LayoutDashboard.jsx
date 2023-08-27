import PropTypes from "prop-types";
import SideBar from "../../../components/sideBar/SideBar";
import "./LayoutDashboard.scss"; // Importa tus estilos de Sass

const LayoutDashboard = ({ children }) => {
  return (
    <div className="layoutDashboard-container">
      <div className="layoutDashboard-sidebar">
        <SideBar />
      </div>
      <div className="layoutDashboard-content">{children}</div>
    </div>
  );
};

LayoutDashboard.propTypes = {
  children: PropTypes.node,
};

export default LayoutDashboard;
