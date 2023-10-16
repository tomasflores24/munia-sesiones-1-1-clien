import React from "react";
import "./LoadingSpinnerStyle.scss";

const LoadingSpinner = ({start, end}) => {
  return (
    <div className={start ? `loading__wrapper__${start}` : end ? `loading__wrapper__${end}` : "loading__wrapper" }>
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
