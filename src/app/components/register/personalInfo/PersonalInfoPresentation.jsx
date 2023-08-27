import PropTypes from "prop-types";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ButtonNext from "../../Common/Button/ButtonNext";
import "./PersonalInfoPresentation.scss";

const PersonalInfoPresentation = ({
  dataUser,
  isValidEmail,
  isFormComplete,
  handleInputChange,
  handleImageUpload,
  handleSubmit,
}) => {
  return (
    <div className="info-personal">
      <h3 className="title-info-personal">
        Comencemos con la información más básica
      </h3>
      <div className="info">
        <div className="info-inputs">
          <div className="input-field">
            <label className="input-label" htmlFor="name">
              Nombre
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="custom-input"
              placeholder="Nombre completo"
              value={dataUser.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-field">
            <label className="input-label" htmlFor="last-name">
              Apellido/s
            </label>
            <input
              id="last-name"
              name="lastName"
              type="text"
              className="custom-input"
              placeholder="Apellido"
              value={dataUser.lastName}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-field">
            <label className="input-label" htmlFor="phone">
              Teléfono
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="custom-input"
              placeholder="Celular o teléfono"
              value={dataUser.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-field">
            <label className="input-label" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className="custom-input"
              placeholder="Contraseña"
              value={dataUser.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-field">
            <label className="input-label" htmlFor="repeat-password">
              Repetir Contraseña
            </label>
            <input
              id="repeat-password"
              type="password"
              name="repeatPassword"
              className="custom-input"
              placeholder="Repetir Contraseña"
              value={dataUser.repeatPassword}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-field">
            <label className="input-label" htmlFor="email">
              Correo
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="custom-input"
              placeholder="Correo electronico"
              value={dataUser.email}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div
          className="upload-section"
          style={{
            backgroundImage: `url(${
              dataUser.imageUser
                ? dataUser.imageUser
                : "../../../../assets/noImageUser.png"
            })`,
          }}
        >
          <div className="upload-image">
            <label htmlFor="profile-image" className="upload-label">
              <FileUploadIcon sx={{ width: "50%", height: "100%" }} />
              <input
                type="file"
                id="profile-image"
                name="profileImage"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </div>
      </div>
      <div className="next-button-section">
        <ButtonNext
          className="next-button"
          textButton={"Siguiente"}
          handleFunction={handleSubmit}
        />
      </div>
      {!isValidEmail && (
        <p className="error-message">Ingresa un correo electrónico válido</p>
      )}
      {!isFormComplete && (
        <p className="error-message">Faltan completar campos</p>
      )}
    </div>
  );
};
// Define los propTypes
PersonalInfoPresentation.propTypes = {
  dataUser: PropTypes.shape({
    name: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    repeatPassword: PropTypes.string.isRequired,
    imageUser: PropTypes.string,
  }).isRequired,
  isValidEmail: PropTypes.bool.isRequired,
  isFormComplete: PropTypes.bool.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleImageUpload: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
export default PersonalInfoPresentation;
