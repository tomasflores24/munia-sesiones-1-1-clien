import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import EventNoteIcon from '@mui/icons-material/EventNote';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import PsychologyIcon from '@mui/icons-material/Psychology';

export const buttonDataUser = [
    { title: "Home", icon: <HomeIcon style={{ fontSize: '30px' }} />, redirect: "home" },
    { title: "Perfil", icon: <PersonIcon style={{ fontSize: '30px' }} />, redirect: "perfil" },
    { title: "Agenda", icon: <EventNoteIcon style={{ fontSize: '30px' }} />, redirect: "agenda" },
    { title: "Configuración", icon: <SettingsIcon style={{ fontSize: '30px' }} />, redirect: "configuracion" },
];

export const buttonDataAdmin = [
    { title: "Home", icon: <HomeIcon style={{ fontSize: '30px' }} />, redirect: "home" },
    { title: "Agenda", icon: <EventNoteIcon style={{ fontSize: '30px' }} />, redirect: "agenda" },
    { title: "Clientes", icon: <PeopleIcon style={{ fontSize: '30px' }} />, redirect: "clientes" },
    { title: "Estadisticas", icon: <AnalyticsIcon style={{ fontSize: '30px' }} />, redirect: "estadisticas" },
    { title: "Configuración", icon: <SettingsIcon style={{ fontSize: '30px' }} />, redirect: "configuracion" },
    { title: "Provedores", icon: <PsychologyIcon style={{ fontSize: '30px' }} />, redirect: "proveedores" },
]