import PropTypes from "prop-types";
import "./ModalMessage.scss";
const ModalMessage = ({ handleCloseAlert, text }) => {
  return (
    <div className="modal-container">
      <div className="modal-content">
        <h2 className="modal-title">Atención!</h2>
        <p className="modal-message">{text}</p>
        <div className="modal-actions">
          <button className="modal-button" onClick={handleCloseAlert}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

ModalMessage.propTypes = {
  handleCloseAlert: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default ModalMessage;
