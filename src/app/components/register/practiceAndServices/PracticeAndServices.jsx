import { useState } from "react";
import "./PracticeAndServices.scss";
import ButtonBack from "../../Button/ButtonBack";
import { useDispatch } from "react-redux";
import { backStep } from "../../../redux/slices/registrationSlice/registrationSlice";
import Button from "../../Button/Button";

const PracticeAndServices = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const dispatch = useDispatch();
  const options = [
    "Consulta médica",
    "Dentista",
    "Psicólogo",
    "Nutricionista",
    "Terapeuta físico",
  ];

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleAddOption = () => {
    if (selectedOption && !selectedOptions.includes(selectedOption)) {
      setSelectedOptions([...selectedOptions, selectedOption]);
      setSelectedOption("");
    }
  };

  const handleRemoveOption = (option) => {
    setSelectedOptions(selectedOptions.filter((item) => item !== option));
  };

  const handleBack = () => {
    dispatch(backStep());
  };
  const handleSubmitRegistration = () => {};
  const handleTermsCheck = () => {
    setAcceptedTerms(!acceptedTerms);
  };
  return (
    <div className="practice-and-services">
      <h2>Selecciona los campos en los que deseas asistir a los pacientes.</h2>
      <div className="select-container">
        <select value={selectedOption} onChange={handleOptionChange}>
          <option value="">Selecciona una opción</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button onClick={handleAddOption}>Agregar</button>
      </div>
      <div className="options-container">
        {selectedOptions.map((option) => (
          <div key={option} className="option">
            {option}
            <button onClick={() => handleRemoveOption(option)}>Eliminar</button>
          </div>
        ))}
      </div>
      <section className="buttons-section">
        <ButtonBack textButton={"Atras"} handleFunction={handleBack} />
        <section className="terms-section">
          <input
            type="checkbox"
            id="termsCheck"
            checked={acceptedTerms}
            onChange={handleTermsCheck}
          />
          <label htmlFor="termsCheck">
            Acepto los{" "}
            <label style={{ color: "black", fontSize: "1.6rem" }}>
              Términos de Uso
            </label>
          </label>
        </section>
        <Button handleFunction={handleSubmitRegistration} textButton="Registrarse" />
      </section>
    </div>
  );
};

export default PracticeAndServices;
