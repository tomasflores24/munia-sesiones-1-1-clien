import { useState } from "react";
import "./SelectProfile.scss";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
const SelectProfile = ({ optionDefault, options }) => {
  const [isSelectOpen, setOpenSelect] = useState(false);
  const [optionSelected, setOptionSelected] = useState(optionDefault);

  const handleOption = (e) => {
    setOptionSelected(e.target.value);
    setOpenSelect(false);
  };
  return (
    <div className="selectProfile">
      <label
        className={
          optionSelected !== optionDefault
            ? "selectProfile__optionDefault1"
            : "selectProfile__optionDefault"
        }
        htmlFor={optionDefault}
      >
        {optionSelected !== optionDefault && optionSelected}
        <span
          className={
            optionSelected === optionDefault
              ? "selectProfile__span"
              : "selectProfile__spanSelected"
          }
        >
          {optionDefault}
        </span>

        <KeyboardArrowDownIcon className="selectProfile__icon" />
      </label>
      <div className="selectProfile__options--container">
        <input
          type="checkbox"
          id={optionDefault}
          onChange={() => setOpenSelect(!isSelectOpen)}
          checked={isSelectOpen}
          hidden
          className="select"
        />
        <div className="selectProfile__options">
          {options.map((option, index) => (
            <option
              onClick={handleOption}
              className="selectProfile__option"
              key={index}
              value={option}
            >
              {option}
            </option>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectProfile;
