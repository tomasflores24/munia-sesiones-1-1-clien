import { useState } from "react";
import "./Register.scss";
import PersonalInfo from "./personalInfo/PersonalInfo";

const Register = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className="registration-container">
      <div className="registration-content">
        <h1 className="title-register">
          <strong>Construye</strong> tu perfil
        </h1>
        <p className="subtitle">
          Esta información nos permitirá saber más sobre{" "}
          <span className="subtitle-usted">usted.</span>
        </p>
        <div className="tabs-container">
          <div
            className={`tab ${tabValue === 0 ? "active" : ""}`}
            onClick={() => handleTabChange(0)}
          >
            Información personal
          </div>
          <div
            className={`tab ${tabValue === 1 ? "active" : ""}`}
            onClick={() => handleTabChange(1)}
          >
            Documentación
          </div>
          <div
            className={`tab ${tabValue === 2 ? "active" : ""}`}
            onClick={() => handleTabChange(2)}
          >
            Servicios
          </div>
        </div>
        <div className="tab-content">
          {tabValue === 0 && <PersonalInfo />}
          {tabValue === 1 && <div>Contenido de Documentación y práctica</div>}
          {tabValue === 2 && <div>Contenido de Servicios</div>}
        </div>
      </div>
    </div>
  );
};

export default Register;
