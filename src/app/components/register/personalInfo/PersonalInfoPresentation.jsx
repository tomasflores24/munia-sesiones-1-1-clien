import PropTypes from "prop-types";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ButtonNext from "../../Common/Button/ButtonNext";
import "./PersonalInfoPresentation.scss";
import { useState } from "react";
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Input } from "@mui/material";

const PersonalInfoPresentation = ({
  dataUser,
  isValidEmail,
  isFormComplete,
  handleInputChange,
  handleImageUpload,
  handleSubmit,
}) => {

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="info-personal">
      <h3 className="title-info-personal">
        Comencemos con la información más básica
      </h3>
      <div className="info">
        <div className="info-inputs">
          <FormControl className="input-field" variant="standard">
          <div className="input-label-margin">
            <InputLabel className="input-label" htmlFor="standard-adornment-password">Nombre</InputLabel>
          </div>
            <Input
              required
              className="custom-input"
              id="standard-adornment-password"
              type="text"
              name="name"
              value={dataUser.name}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl className="input-field" variant="standard">
          <div className="input-label-margin">
            <InputLabel className="input-label" htmlFor="standard-adornment-password">Apellido</InputLabel>
          </div>
            <Input
              required
              className="custom-input"
              id="standard-adornment-password"
              type="text"
              name="lastName"
              value={dataUser.lastName}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl className="input-field" variant="standard">
          <div className="input-label-margin">
            <InputLabel className="input-label" htmlFor="standard-adornment-password">Correo electronico</InputLabel>
          </div>
            <Input
              required
              className="custom-input"
              id="standard-adornment-password"
              type="email"
              name="email"
              value={dataUser.email}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl className="input-field" variant="standard">
            <div className="input-label-margin">
              <InputLabel className="input-label" htmlFor="standard-adornment-password">Teléfono</InputLabel>
            </div>
            <Input
              required
              className="custom-input"
              id="standard-adornment-password"
              type='tel'
              name="phone"
              value={dataUser.phone}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl className="input-field" variant="standard">
          <div className="input-label-margin">
            <InputLabel className="input-label" htmlFor="standard-adornment-password">Contraseña</InputLabel>
          </div>
          <Input
            required
            className="custom-input"
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl className="input-field" variant="standard">
          <div className="input-label-margin">
            <InputLabel className="input-label" htmlFor="standard-adornment-password">Repetir Contraseña</InputLabel>
          </div>
          <Input
            required
            className="custom-input"
            id="standard-adornment-password repeat-password"
            type={showPassword ? 'text' : 'password'}
            name="repeatPassword"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onChange={handleInputChange}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        </div>
        <div className="box-upload-section">
          <div
            className="upload-section"
            style={{
              backgroundImage: `url(${
                dataUser?.imageUser
                  ? dataUser?.imageUser
                  : "../../../../assets/noImageUser.png"
              })`,
            }}
          >
            <div className="upload-image">
              <label htmlFor="profile-image" className="upload-label">
                <FileUploadIcon sx={{ width: "25%", height: "50%", cursor: 'pointer' }} />
                <input
                  type="file"
                  id="profile-image"
                  name="profileImage"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />
                Subir imagen
              </label>
            </div>
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
      {isFormComplete === "vacio" && (
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
