import { useState } from "react";
import PropTypes from "prop-types";
import "./SelectedOptions.scss";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
const SelectedOptions = ({ options, onSelectedOptionsChange, title }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (e) => {
    const selectedOption = e.target.value;
    if (selectedOption && !selectedOptions.includes(selectedOption)) {
      const updatedOptions = [...selectedOptions, selectedOption];
      setSelectedOptions(updatedOptions);
      onSelectedOptionsChange(updatedOptions);
    }
  };

  const handleRemoveOption = (optionToRemove) => {
    const updatedOptions = selectedOptions.filter(
      (option) => option !== optionToRemove
    );
    setSelectedOptions(updatedOptions);
    onSelectedOptionsChange(updatedOptions);
  };

  return (
    <div className="selected-items-container">
      <div className="select-container">
        <select value="" onChange={handleOptionChange}>
          <option className="option" value="" disabled>
            {title || "Selecciona una opción"}
            <KeyboardArrowDownIcon />
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="options-container">
        {selectedOptions.map((option) => (
          <div key={option} className="option">
            {option}
            <button onClick={() => handleRemoveOption(option)}>X</button>
          </div>
        ))}
      </div>
    </div>
  );
};

SelectedOptions.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectedOptionsChange: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default SelectedOptions;
