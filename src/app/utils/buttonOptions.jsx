import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import EventNoteIcon from "@mui/icons-material/EventNote";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleIcon from "@mui/icons-material/People";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import PsychologyIcon from "@mui/icons-material/Psychology";
import SmsIcon from "@mui/icons-material/Sms";
import WorkIcon from "@mui/icons-material/Work";
import TextsmsIcon from '@mui/icons-material/Textsms';


export const buttonDataProfessionals = [
  {
    title: "Home",
    icon: <HomeIcon style={{ fontSize: "30px" }} />,
    redirect: "home",
  },
  {
    title: "Perfil",
    icon: <PsychologyIcon style={{ fontSize: "30px" }} />,
    redirect: "profile",
  },
  {
    title: "Agenda",
    icon: <EventNoteIcon style={{ fontSize: "30px" }} />,
    redirect: "diary",
  },
  {
    title: "Pacientes",
    icon: <PeopleIcon style={{ fontSize: "30px" }} />,
  },
  {
    title: "Comentarios",
    icon: <SmsIcon style={{ fontSize: "30px" }} />,
  },
  {
    title: "Estadisticas",
    icon: <AnalyticsIcon style={{ fontSize: "30px" }} />,
    redirect: "statistics",
  },
];

export const buttonDataAdmin = [
  {
    title: "Home",
    icon: <HomeIcon style={{ fontSize: "30px" }} />,
    redirect: "home",
  },
  {
    title: "Comments",
    icon: <TextsmsIcon style={{ fontSize: "30px" }} />,
    redirect: "comments",
  },
  {
    title: "Agenda",
    icon: <PsychologyIcon style={{ fontSize: "30px" }} />,
    redirect: "diary",
  },
  {
    title: "Clientes",
    icon: <PeopleIcon style={{ fontSize: "30px" }} />,
    redirect: "clients",
  },
  {
    title: "Estadisticas",
    icon: <AnalyticsIcon style={{ fontSize: "30px" }} />,
    redirect: "statistics",
  },
  {
    title: "Membresías",
    icon: <SettingsIcon style={{ fontSize: "30px" }} />,
    redirect: "memberships",
  },
  {
    title: "Proveedores",
    icon: <PsychologyIcon style={{ fontSize: "30px" }} />,
    redirect: "providers",
  },
  {
    title: "Servicios",
    icon: <WorkIcon style={{ fontSize: "30px" }} />,
    redirect: "services",
  },
];

export const buttonDataCompanies = [
  {
    title: "Home",
    icon: <HomeIcon style={{ fontSize: "30px" }} />,
    redirect: "home",
  },
  {
    title: "Estadisticas",
    icon: <AnalyticsIcon style={{ fontSize: "30px" }} />,
    redirect: "statistics",
  },
  {
    title: "Agenda",
    icon: <PsychologyIcon style={{ fontSize: "30px" }} />,
    redirect: "diary",
  },
  {
    title: "Colaboradores",
    icon: <PeopleIcon style={{ fontSize: "30px" }} />,
    redirect: "collaborators",
  },
  {
    title: "Membresías",
    icon: <SettingsIcon style={{ fontSize: "30px" }} />,
  },
  {
    title: "Servicios",
    icon: <WorkIcon style={{ fontSize: "30px" }} />,
    redirect: "services",
  },
];

export const buttonDataCollaborators = [
  {
    title: "Home",
    icon: <HomeIcon style={{ fontSize: "30px" }} />,
    redirect: "home",
  },
  {
    title: "Perfil",
    icon: <PersonIcon style={{ fontSize: "30px" }} />,
    redirect: "userProfile",
  },
  {
    title: "Agenda",
    icon: <EventNoteIcon style={{ fontSize: "30px" }} />,
    redirect: "diary",
  },
  {
    title: "Profesionales",
    icon: <PsychologyIcon style={{ fontSize: "30px" }} />,
  },
];
