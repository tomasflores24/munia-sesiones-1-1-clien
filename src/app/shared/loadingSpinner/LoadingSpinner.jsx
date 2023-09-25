import React from "react";
import "./LoadingSpinnerStyle.scss";

const LoadingSpinner = () => {
  return (
    <div className="loading-wrapper">
      <div className="lds-roller">
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
