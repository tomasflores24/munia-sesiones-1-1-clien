import React from "react";
import "./LoadingSpinnerStyle.scss";

const LoadingSpinner = ({left, right, top, bottom}) => {
  return (
    <div className={left ? `loading__wrapper__${left}` : right ? `loading__wrapper__${right}` : top ? `loading__wrapper__${top}`: bottom ? `loading__wrapper__${bottom}` : "loading__wrapper"}>
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
