import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import EventNoteIcon from "@mui/icons-material/EventNote";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleIcon from "@mui/icons-material/People";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import PsychologyIcon from "@mui/icons-material/Psychology";
import LogoutIcon from "@mui/icons-material/Logout";

export const buttonDataUser = [
  {
    title: "Home",
    icon: <HomeIcon style={{ fontSize: "30px" }} />,
    redirect: "/home",
  },
  {
    title: "Perfil",
    icon: <PersonIcon style={{ fontSize: "30px" }} />,
    redirect: "/profile",
  },
  {
    title: "Agenda",
    icon: <EventNoteIcon style={{ fontSize: "30px" }} />,
    redirect: "/diary",
  },
  {
    title: "Configuración",
    icon: <SettingsIcon style={{ fontSize: "30px" }} />,
    redirect: "/configuration",
  },
  {
    title: "Salir",
    icon: <LogoutIcon style={{ fontSize: "30px" }} />,
    redirect: "/logout",
  },
];

export const buttonDataAdmin = [
  {
    title: "Home",
    icon: <HomeIcon style={{ fontSize: "30px" }} />,
    redirect: "/home",
  },
  {
    title: "Comments",
    icon: <HomeIcon style={{ fontSize: "30px" }} />,
    redirect: "/comments",
  },
  {
    title: "Agenda",
    icon: <EventNoteIcon style={{ fontSize: "30px" }} />,
    redirect: "/diary",
  },
  {
    title: "Clientes",
    icon: <PeopleIcon style={{ fontSize: "30px" }} />,
    redirect: "/clients",
  },
  {
    title: "Estadisticas",
    icon: <AnalyticsIcon style={{ fontSize: "30px" }} />,
    redirect: "/statistics",
  },
  {
    title: "Configuración",
    icon: <SettingsIcon style={{ fontSize: "30px" }} />,
    redirect: "/configuration",
  },
  {
    title: "Provedores",
    icon: <PsychologyIcon style={{ fontSize: "30px" }} />,
    redirect: "/proveedores",
  },
  {
    title: "Salir",
    icon: <LogoutIcon style={{ fontSize: "30px" }} />,
    redirect: "/logout",
  },
];
