import PropTypes from "prop-types";
import "./ButtonNext.scss";
const ButtonNext = ({ handleFunction, textButton, className }) => {
  return (
    <div>
      <button
        className={className ? className : "next-button"}
        onClick={handleFunction}
      >
        {textButton}
      </button>
    </div>
  );
};

ButtonNext.propTypes = {
  //Pueden pasar por props la funcion a ejecutar cuando se haga click en el button
  handleFunction: PropTypes.func, // Espera una función y es requerida
  //Text del button
  textButton: PropTypes.string.isRequired,
  //Cargar estilos personalizado, en caso de no pasarlos por props, se coloca classname default
  className: PropTypes.string,
};

export default ButtonNext;
