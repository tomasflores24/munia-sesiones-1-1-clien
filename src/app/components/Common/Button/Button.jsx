import PropTypes from "prop-types";
import "./Button.scss";
const Button = ({ handleFunction, textButton, className, name }) => {
  return (
    <div>
      <button
        className={className ? className : "button"}
        onClick={handleFunction}
        name={name ? name : ""}
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
  name: PropTypes.string,
};

export default Button;
