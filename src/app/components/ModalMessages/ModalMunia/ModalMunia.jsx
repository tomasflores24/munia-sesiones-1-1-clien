import PropTypes from "prop-types";
import "./ModalMunia.scss";
import { NavLink } from "react-router-dom";

const ModalMunia = ({ handleFunction, text, title, subtitle }) => {
  return (
    <div className="modal-munia-container">
      <div className="modal-munia-content">
        <h2 className="modal-title">{title}</h2>
        <p className="modal-message">{text}</p>
        <p className="modal-subtitle">
          {subtitle ? (
            subtitle
          ) : (
            <>
              Con gratitud, El Equipo de{" "}
              <strong className="name-munia" style={{ color: "" }}>
                Munia
              </strong>
            </>
          )}
        </p>
        <div className="modal-actions">
          <NavLink to='/'>
            <button className="modal-button" onClick={handleFunction}>
              Ingresar
            </button>
          </NavLink>
        </div>
      </div>
      <section className="section-munia">
        <img src="../../../../assets/logoMunia.png"></img>
      </section>
    </div>
  );
};

ModalMunia.propTypes = {
  handleFunction: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default ModalMunia;
