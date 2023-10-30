import PropTypes from "prop-types";
import "./ButtonBack.scss";
const ButtonBack = ({ handleFunction, textButton, className }) => {
  return (
    <div>
      <button
        className={className ? className : "back-button"}
        onClick={handleFunction}
      >
        {textButton}
      </button>
    </div>
  );
};

ButtonBack.propTypes = {
  //Pueden pasar por props la funcion a ejecutar cuando se haga click en el button
  handleFunction: PropTypes.func, // Espera una función y es requerida
  //Text del button
  textButton: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default ButtonBack;
