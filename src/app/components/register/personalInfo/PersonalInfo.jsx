import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import "./PersonalInfo.scss";
import {
  nextStep,
  savePersonalInfo,
} from "../../../redux/slices/registrationSlice/registrationSlice";
import { useDispatch } from "react-redux";
import ButtonNext from "../../Button/ButtonNext";

const PersonalInfoTab = () => {
  // const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const [dataUser, setDataUser] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    repeatPassword: "",
  });

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setDataUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleTogglePasswordVisibility = () => {
  //   setShowPassword((prevShowPassword) => !prevShowPassword);
  // };

  const handleSubmit = () => {
    //HACER RUTA ENVIAR AL BACKEND LOS DATOS DEL USUARIO REGISTRADO
    dispatch(nextStep());
    //Guardamos datos del usuario en el estado de redux.
    dispatch(savePersonalInfo(dataUser));
    // Limpia los campos después de enviar
    setDataUser({
      name: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      repeatPassword: "",
    });
  };

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
              placeholder="Nombre"
              value={dataUser.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-field">
            <label className="input-label" htmlFor="last-name">
              Apellido
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
        </div>

        <div className="upload-section">
          <div className="upload-image">
            <Avatar sx={{ width: 80, height: 80 }}>
              <InsertPhotoIcon fontSize="large" />
            </Avatar>
          </div>
        </div>
      </div>
      <div className="next-button-section">
        <ButtonNext className="next-button" textButton={"Siguiente"} handleFunction={handleSubmit} />
      </div>
    </div>
  );
};

export default PersonalInfoTab;
