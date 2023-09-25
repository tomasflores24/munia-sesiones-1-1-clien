import "./PracticesAndServicesStyle.scss";

import React from "react";

const PracticesAndServices = ({ step, setStep }) => {
  return (
    <div>
      <button type="button" onClick={() => setStep(step - 1)}>
        atras
      </button>
    </div>
  );
};

export default PracticesAndServices;
