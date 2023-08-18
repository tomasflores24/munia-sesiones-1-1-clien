import { useEffect, useState } from "react";
import "./PersonalInfo.scss";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import {
  nextStep,
  savePersonalInfo,
} from "../../../redux/slices/registrationSlice/registrationSlice";
import { useDispatch, useSelector } from "react-redux";
import ButtonNext from "../../Button/ButtonNext";

const PersonalInfoTab = () => {
  const dispatch = useDispatch();
  const userInfoCurrent = useSelector(
    (state) => state.registration.dataUser
  );
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [dataUser, setDataUser] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    repeatPassword: "",
  });

  // const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setDataUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const checkFormCompletion = () => {
    const { name, lastName, email, phone, password, repeatPassword } = dataUser;
    return (
      name !== "" &&
      lastName !== "" &&
      email !== "" &&
      phone !== "" &&
      password !== "" &&
      repeatPassword !== ""
    );
  };

  const handleSubmit = () => {
    const isValid = validateEmail(dataUser.email);
    setIsValidEmail(isValid);

    if (isValid && isFormComplete) {
      dispatch(nextStep());
      dispatch(savePersonalInfo(dataUser));
      setDataUser({
        name: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        repeatPassword: "",
        imageUser: "",
      });
    }
  };

  const handleImageUpload = (e) => {
    const imageFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setDataUser({ ...dataUser, imageUser: imageUrl });
  };

  useEffect(() => {
    setIsFormComplete(checkFormCompletion());
  }, [dataUser]);

  useEffect(() => {
    setDataUser({
      name: userInfoCurrent.name || "",
      lastName: userInfoCurrent.lastName || "",
      email: userInfoCurrent.email || "",
      phone: userInfoCurrent.phone || "",
      password: userInfoCurrent.password || "",
      repeatPassword: userInfoCurrent.repeatPassword || "",
      imageUser: userInfoCurrent.imageUser || "",
    });
  }, [userInfoCurrent]);

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

export default PersonalInfoTab;
