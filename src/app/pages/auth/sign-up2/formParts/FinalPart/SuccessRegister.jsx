import "./SuccessRegisterStyle.scss";
import { useNavigate } from "react-router-dom";

const SuccessRegister = () => {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate("/")
  }, [5000])

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

export default SuccessRegister;
