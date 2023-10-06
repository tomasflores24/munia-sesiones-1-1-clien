import { PropTypes } from "prop-types";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";

import "./SuccessRegisterStyle.scss";
import { setDataSuccess } from "../../../../../redux/slices/authSlice/authSlice";

const SuccessRegister = ({ registerToken }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const decoded = jwtDecode(registerToken);

    setTimeout(() => {
      dispatch(
        setDataSuccess({
          token: registerToken,
          isAuthenticated: true,
          user: {
            id: decoded.userId,
            userTypeId: decoded.userTypeId,
            email: decoded.email,
          },
        })
      );
    }, [3000]);
  }, [dispatch, registerToken]);

  return (
    <div className="successRegister__root">
      <div className="successRegister__contentContainer">
        <div>
          <h1 className="title">¡Gracias por registrarte!</h1>
          <div className="description">
            <p>
              Queremos expresar nuestro sincero agradecimiento por unirte. Tu
              registro es un paso importante hacia la creación de una comunidad
              que valora la salud mental y emocional en el trabajo.
            </p>
            <br />
            <p>
              Si tienes alguna pregunta o necesitas ayuda, no dudes en
              contactarnos.
            </p>
          </div>
        </div>

        <p className="greetings__text">
          Con gratitud, El Equipo de <span>Munia.</span>
        </p>
      </div>
      <div className="successRegister__footer">
        <img className="logo" src="/assets/logoMunia.png" alt="Logo Munia" />
      </div>
    </div>
  );
};

SuccessRegister.propTypes = {
  registerToken: PropTypes.string.isRequired,
};

export default SuccessRegister;
