import ButtonBack from "../../Common/Button/ButtonBack";
import Button from "../../Common/Button/Button"
import PropTypes from "prop-types";
import "./PracticeAndServicesPresentation.scss";
import ModalMessage from "../../ModalMessages/ModalAlertMessage/ModalMessage";

const PracticeAndServicesPresentation = ({
  selectedOption,
  selectedOptions,
  acceptedTerms,
  handleOptionChange,
  // handleAddOption,
  handleRemoveOption,
  handleBack,
  handleSubmitRegistration,
  handleTermsCheck,
  options,
  showAlert,
  handleCloseAlert,
}) => {
  return (
    <div className="practice-and-services">
      <h2>Selecciona los campos en los que deseas asistir a los pacientes.</h2>
      <div className="selected-items-container">
        <div className="select-container">
          <select value={selectedOption} onChange={handleOptionChange}>
            <option className="option" value="">
              Selecciona una opción
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
      <section className="buttons-section">
        <ButtonBack textButton={"Atras"} handleFunction={handleBack} />
        <section className="terms-section">
          <input
            type="checkbox"
            id="termsCheck"
            checked={acceptedTerms}
            onChange={handleTermsCheck}
          />
          <label htmlFor="termsCheck" className="terms-check">
            <label>Acepto los </label>
            <strong style={{ color: "black", fontSize: "1.6rem" }}>
              Términos de Uso
            </strong>
          </label>
        </section>
        <section className="button-register">

        <Button
          handleFunction={handleSubmitRegistration}
          textButton="Registrarse"
        />
        </section>
      </section>
      {showAlert && (
        <ModalMessage
          text={
            "Por favor, acepte los términos de uso para continuar con su registro."
          }
          title="¡Gracias por registrarte!"
          handleCloseAlert={handleCloseAlert}
        />
      )}
    </div>
  );
};
PracticeAndServicesPresentation.propTypes = {
  selectedOption: PropTypes.string,
  selectedOptions: PropTypes.arrayOf(PropTypes.string),
  acceptedTerms: PropTypes.bool,
  handleOptionChange: PropTypes.func.isRequired,
  // handleAddOption: PropTypes.func.isRequired,
  handleRemoveOption: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleSubmitRegistration: PropTypes.func.isRequired,
  handleTermsCheck: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  showAlert: PropTypes.boolean,
  handleCloseAlert: PropTypes.func.isRequired,
  registrationSuccess: PropTypes.boolean,
};
export default PracticeAndServicesPresentation;
