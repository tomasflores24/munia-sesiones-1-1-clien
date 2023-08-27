import PropTypes from "prop-types";
import "./Button.scss";
const Button = ({ handleFunction, textButton, className }) => {
  return (
    <div>
      <button
        className={className ? className : "button"}
        onClick={handleFunction}
      >
        {textButton}
      </button>
    </div>
  );
};

Button.propTypes = {
  //Pueden pasar por props la funcion a ejecutar cuando se haga click en el button
  handleFunction: PropTypes.func, // Espera una función y es requerida
  //Text del button
  textButton: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Button;
