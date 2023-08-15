import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import PersonalInfo from "./personalInfo/PersonalInfo";
import "./Register.scss";

const Register = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className="registration-container">
     <h1 className="title-register">
  <strong>Construye</strong> tu perfil
</h1>

      <Typography variant="subtitle1">
        Esta información nos permitirá saber más sobre usted.
      </Typography>
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="Información personal" />
        <Tab label="Documentación" />
        <Tab label="Servicios" />
      </Tabs>
      {tabValue === 0 && <PersonalInfo />}
      {tabValue === 1 && <div>Contenido de Documentación y práctica</div>}
      {tabValue === 2 && <div>Contenido de Servicios</div>}
    </div>
  );
};

export default Register;
