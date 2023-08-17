import "./Register.scss";
import Documentation from "./documentation/Documentation";
import PersonalInfo from "./personalInfo/PersonalInfo";
import { useSelector } from "react-redux";
import PracticeAndServices from "./practiceAndServices/PracticeAndServices";

const Register = () => {
  const currentStep = useSelector((state) => state.registration.currentStep);
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
          <div className={`tab ${currentStep === 1 ? "active" : ""}`}>
            Información personal
          </div>
          <div className={`tab ${currentStep === 2 ? "active" : ""}`}>
            Documentación
          </div>
          <div className={`tab ${currentStep === 3 ? "active" : ""}`}>
            Servicios
          </div>
        </div>
        <div className="tab-content">
          {currentStep === 1 && <PersonalInfo />}
          {currentStep === 2 && <Documentation />}
          {currentStep === 3 && <PracticeAndServices />}
        </div>
      </div>
    </div>
  );
};

export default Register;
