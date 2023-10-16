import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import EventNoteIcon from "@mui/icons-material/EventNote";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleIcon from "@mui/icons-material/People";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import PsychologyIcon from "@mui/icons-material/Psychology";
import SmsIcon from "@mui/icons-material/Sms";
import WorkIcon from "@mui/icons-material/Work";
import TextsmsIcon from "@mui/icons-material/Textsms";

import Buttons from "./buttons";
import { logOut } from "../../../redux/slices/authSlice/authSlice";

const NavItems = ({ userTypeId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();


  const redirect = (path) => {
    navigate(`/dashboard/${path}`);
  };

  return (
    <>
      <Buttons
        className="sidebarButtons"
        title="Home"
        icon={<HomeIcon style={{ fontSize: "30px" }} />}
        key="Home"
        selected={location.pathname.includes("/home")}
        onClick={() => redirect("home")}
      />
      {(userTypeId === 2 || userTypeId === 3) && (
        <Buttons
          className="sidebarButtons"
          title="Perfil"
          icon={<PersonIcon style={{ fontSize: "30px" }} />}
          key="Home"
          selected={location.pathname.includes("/profile")}
          onClick={() => redirect("profile")}
        />
      )}
      {userTypeId === 2 && (
        <Buttons
          className="sidebarButtons"
          title="Profesionales"
          icon={<PsychologyIcon style={{ fontSize: "30px" }} />}
          key="Profesionales"
          selected={location.pathname.includes("/professionals")}
          onClick={() => redirect("professionals")}
        />
      )}
      <Buttons
        className="sidebarButtons"
        title="Agenda"
        icon={<EventNoteIcon style={{ fontSize: "30px" }} />}
        key="Agenda"
        selected={location.pathname.includes("/appointments")}
        onClick={() => redirect("appointments")}
      />
      {userTypeId === 3 && (
        <>
          <Buttons
            className="sidebarButtons"
            title="Pacientes"
            icon={<PeopleIcon style={{ fontSize: "30px" }} />}
            key="Pacientes"
            selected={location.pathname.includes("/patients")}
            onClick={() => redirect("patients")}
          />
          <Buttons
            className="sidebarButtons"
            title="Comentarios"
            icon={<SmsIcon style={{ fontSize: "30px" }} />}
            key="Comentarios"
            selected={location.pathname.includes("/comments")}
            onClick={() => redirect("comments")}
          />
        </>
      )}
      {(userTypeId === 3 || userTypeId === 1 || userTypeId === 4) && (
        <Buttons
          className="sidebarButtons"
          title="Estadisticas"
          icon={<AnalyticsIcon style={{ fontSize: "30px" }} />}
          key="Estadisticas"
          selected={location.pathname.includes("/statistics")}
          onClick={() => redirect("statistics")}
        />
      )}
      {userTypeId === 1 && (
        <Buttons
          className="sidebarButtons"
          title="Colaboradores"
          icon={<PeopleIcon style={{ fontSize: "30px" }} />}
          key="Colaboradores"
          selected={location.pathname.includes("/collaborators")}
          onClick={() => redirect("collaborators")}
        />
      )}
      {userTypeId === 4 && (
        <>
          <Buttons
            className="sidebarButtons"
            title="Comentarios"
            icon={<TextsmsIcon style={{ fontSize: "30px" }} />}
            key="Comentarios"
            selected={location.pathname.includes("/comments")}
            onClick={() => redirect("comments")}
          />
          <Buttons
            className="sidebarButtons"
            title="Clientes"
            icon={<PeopleIcon style={{ fontSize: "30px" }} />}
            key="Clientes"
            selected={location.pathname.includes("/clients")}
            onClick={() => redirect("clients")}
          />
          <Buttons
            className="sidebarButtons"
            title="Proveedores"
            icon={<PeopleIcon style={{ fontSize: "30px" }} />}
            key="Proveedores"
            selected={location.pathname.includes("/providers")}
            onClick={() => redirect("providers")}
          />
        </>
      )}
      {(userTypeId === 1 || userTypeId === 4) && (
        <>
          <Buttons
            className="sidebarButtons"
            title="Membresías"
            icon={<SettingsIcon style={{ fontSize: "30px" }} />}
            key="Membresías"
            selected={location.pathname.includes("/memberships")}
            onClick={() => redirect("memberships")}
          />
          <Buttons
            className="sidebarButtons"
            title="Servicios"
            icon={<WorkIcon style={{ fontSize: "30px" }} />}
            key="Servicios"
            selected={location.pathname.includes("/services")}
            onClick={() => redirect("services")}
          />
        </>
      )}
      <Buttons
        className="sidebarButtons"
        title="Salir"
        icon={<LogoutIcon style={{ fontSize: "30px" }} />}
        selected={location.pathname.includes("/logout")}
        onClick={() => dispatch(logOut())}
      />
    </>
  );
};

NavItems.propTypes = {
  userTypeId: PropTypes.number,
};

export default NavItems;
