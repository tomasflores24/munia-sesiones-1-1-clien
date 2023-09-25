import "./SignUp2Style.scss";
import React, { useState } from "react";
import GeneralInformation from "./formParts/Part1/GeneralInformation";
import Documentation from "./formParts/Part2/Documentation";
import PracticesAndServices from "./formParts/Part3/PracticesAndServices";

const SignUp2 = () => {
  const [step, setStep] = useState(0);

  const formDispense = () => {
    switch (step) {
      case 0:
        return <GeneralInformation step={step} setStep={setStep} />;
      case 1:
        return <Documentation step={step} setStep={setStep} />;
      case 2:
        return <PracticesAndServices step={step} setStep={setStep} />;
      default:
        break;
    }
  };

  return (
    <div className="signup__root">
      <div className="signup__form">
        <h1 className="signup__title">
          Construye <span>tu perfil</span>
        </h1>
        <p className="signup__subtitle">
          Esta información nos permitirá saber más sobre <span>usted</span>
        </p>
        <div className="signup__stepers">
          <div className={`steper ${step === 0 ? "selected" : ""}`}>
            <h3>Información Personal</h3>
          </div>
          <div className={`steper ${step === 1 ? "selected" : ""}`}>
            <h3>Documentación</h3>
          </div>
          <div className={`steper ${step === 2 ? "selected" : ""}`}>
            <h3>Práctica y Servicios</h3>
          </div>
        </div>
        <div className="variable__form">{formDispense()}</div>
      </div>
    </div>
  );
};

export default SignUp2;
