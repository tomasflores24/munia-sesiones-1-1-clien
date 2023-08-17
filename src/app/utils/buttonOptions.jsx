import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import TodayIcon from '@mui/icons-material/Today';
import SettingsIcon from '@mui/icons-material/Settings';

export const buttonData = [
    { title: "Home", icon: <HomeIcon style={{ fontSize: '30px' }} />, redirect: "/home" },
    { title: "Perfil", icon: <PersonIcon style={{ fontSize: '30px' }} />, redirect: "/perfil" },
    { title: "Agenda", icon: <TodayIcon style={{ fontSize: '30px' }} />, redirect: "/agenda" },
    { title: "Configuración", icon: <SettingsIcon style={{ fontSize: '30px' }} />, redirect: "/configuracion" },
];
