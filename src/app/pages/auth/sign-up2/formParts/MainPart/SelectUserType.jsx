import PropTypes from "prop-types";

import "./SelectUserTypeStyle.scss";
import { UserTypes } from "../../../../../utils/registerUserType";

const SelectUserType = ({ setStep, setUserType, userType }) => {
  const handleClick = (type) => {
    setUserType(type);
  };

  return (
    <section className="selectUserType__root">
      <div className="selectUserType__topWrapper">
        <h2 className="selectUserType__title">
          Selecciona tu tipo de usuario.
        </h2>

        <div className="user_type_buttons">
          <button
            className={`user ${userType === UserTypes.user ? "selected" : ""}`}
            onClick={() => handleClick(UserTypes.user)}
          >
            Usuario
          </button>
          <button
            className={`psychologist  ${
              userType === UserTypes.psychologist ? "selected" : ""
            }`}
            onClick={() => handleClick(UserTypes.psychologist)}
          >
            Proveedor
          </button>
        </div>
      </div>

      <div className="actions">
        <span />
        <p className="actions__text_slogan">
          Nuestra vision es tu <span>bienestar</span>
        </p>
        <button
          type="button"
          disabled={userType === UserTypes.none}
          onClick={() => setStep((prev) => prev + 1)}
          className={
            userType !== UserTypes.none ? "submit_btn" : "submit_btn disabled"
          }
        >
          Siguiente
        </button>
      </div>
    </section>
  );
};

SelectUserType.propTypes = {
  setStep: PropTypes.func,
  setUserType: PropTypes.any,
  userType: PropTypes.number,
};

export default SelectUserType;
