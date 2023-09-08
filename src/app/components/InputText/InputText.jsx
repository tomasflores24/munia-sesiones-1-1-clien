import { useState } from "react";
import "./InputText.scss";

const InputText = ({ label, value, type }) => {
  const [inputValue, setInputValue] = useState(value);
  const handleInput = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <div className="inputText">
      <label htmlFor={label} className="inputText__label">
        {label}
      </label>
      <input
        type={type ? type : "text"}
        id={label}
        className="inputText__input"
        value={inputValue}
        onChange={handleInput}
      />
    </div>
  );
};

export default InputText;
