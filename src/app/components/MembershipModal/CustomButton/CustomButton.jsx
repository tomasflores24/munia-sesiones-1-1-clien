import PropTypes from 'prop-types';
import './CustomButtonStyle.scss';

const CustomButton = ({ handleFunction, textButton, className, name }) => {
  return (
    <div>
      <button
        className={className ? className : 'custom-button'}
        onClick={handleFunction}
        name={name ? name : ''}
      >
        {textButton}
      </button>
    </div>
  );
};

CustomButton.propTypes = {
  handleFunction: PropTypes.func,
  textButton: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
};

export default CustomButton;
