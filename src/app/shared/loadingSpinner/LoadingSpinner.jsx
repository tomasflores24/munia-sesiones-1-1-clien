import React from "react";
import "./LoadingSpinnerStyle.scss";

const LoadingSpinner = () => {
  return (
    <div className="loading__wrapper">
      <div className="lds__roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
