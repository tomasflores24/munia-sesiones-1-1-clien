import { useState } from "react";

import "./SignUp2Style.scss";
import GeneralInformation from "./formParts/Part1/GeneralInformation";
import Documentation from "./formParts/Part2/Documentation";
import PracticesAndServices from "./formParts/Part3/PracticesAndServices";
import SelectUserType from "./formParts/MainPart/SelectUserType";
import { UserTypes } from "../../../utils/registerUserType";
import SuccessRegister from "./formParts/FinalPart/SuccessRegister";

const SignUp2 = () => {
  const [step, setStep] = useState(0);
  const [userType, setUserType] = useState(UserTypes.none);
  const [registerToken, setRegisterToken] = useState("");

  const formDispense = () => {
    switch (step) {
      case 0:
        return (
          <SelectUserType
            setStep={setStep}
            setUserType={setUserType}
            userType={userType}
          />
        );
      case 1:
        return (
          <GeneralInformation
            step={step}
            setStep={setStep}
            userType={userType}
          />
        );
      case 2:
        return <Documentation step={step} setStep={setStep} />;
      case 3:
        return (
          <PracticesAndServices
            step={step}
            setStep={setStep}
            setRegisterToken={setRegisterToken}
          />
        );
      default:
        break;
    }
  };

  return (
    <div className="signup__root">
      <div className="signup__form">
        {step !== 4 ? (
          <>
            <h1 className="signup__title">
              Construye <span>tu perfil</span>
            </h1>
            <p className="signup__subtitle">
              Esta información nos permitirá saber más sobre <span>usted</span>
            </p>
            <div className="signup__stepers">
              {step === 0 ? (
                <div className="steper main__step">Registro</div>
              ) : (
                <>
                  <div className={`steper ${step === 1 ? "selected" : ""}`}>
                    <h3>Información Personal</h3>
                  </div>
                  {userType === UserTypes.psychologist && (
                    <>
                      <div className={`steper ${step === 2 ? "selected" : ""}`}>
                        <h3>Documentación</h3>
                      </div>
                      <div className={`steper ${step === 3 ? "selected" : ""}`}>
                        <h3>Práctica y Servicios</h3>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
            <div className="variable__form">{formDispense()}</div>
          </>
        ) : (
          <SuccessRegister registerToken={registerToken} />
        )}
      </div>
    </div>
  );
};

export default SignUp2;
