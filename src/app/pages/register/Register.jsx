import "./Register.scss";
import DocumentationContainer from "../../components/register/documentation/DocumentationContainer";
import PersonalInfoContainer from "../../components/register/personalInfo/PersonalInfoContainer";
import { useSelector } from "react-redux";
import PracticeAndServicesContainer from "../../components/register/practiceAndServices/PracticeAndServicesContainer";
import ModalMunia from "../../components/alert/ModalMunia/ModalMunia";
import { useState } from "react";

const Register = () => {
  const currentStep = useSelector((state) => state.registration.currentStep);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  {
    if (registerSuccess) {
      return (
        <div className="registration-container">
          <ModalMunia
            text={
              <>
                Queremos expresar nuestro sincero agradecimiento por unirte. Tu
                registro es un paso importante hacia la creación de una
                comunidad que valora la salud mental y emocional en el trabajo.
                <br />
                <br />
                Si tienes alguna pregunta o necesitas ayuda, no dudes en
                contactarnos.
              </>
            }
            title={"¡Gracias por registrarte!"}
            handleFunction={() => alert("Ir a ingreso")}
          />
          ;
        </div>
      );
    }
  }
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
          {currentStep === 1 && <PersonalInfoContainer />}
          {currentStep === 2 && <DocumentationContainer />}
          {currentStep === 3 && (
            <PracticeAndServicesContainer
              setRegisterSuccess={setRegisterSuccess}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
