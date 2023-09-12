import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Button, Modal } from '@mui/material';
import ButtonBack from '../Common/Button/ButtonBack'
import ButtonNext from '../Common/Button/ButtonNext'
import { nextStep, savePersonalInfo } from '../../redux/slices/registrationSlice/registrationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import './CreateCompany.scss'

// eslint-disable-next-line react/prop-types
function CreateCompany({ onClick }) {
      const dispatch = useDispatch();
  const userInfoCurrentStorage = useSelector(
    (state) => state.registration.dataUser
  );
  const [showLogin, setShowLogin] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isFormComplete, setIsFormComplete] = useState("as");
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
    const isEmpty =
      name !== "" &&
      lastName !== "" &&
      email !== "" &&
      phone !== "" &&
      password !== "" &&
      repeatPassword !== "";

    const result = isEmpty ? "completo" : "vacio";
    return result;
  };

  const handleSubmit = () => {
    const isValid = validateEmail(dataUser.email);
    setIsValidEmail(isValid);
    setIsFormComplete(checkFormCompletion());

    if (isValid && isFormComplete === "completo") {
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
    setDataUser({
      ...dataUser,
      imageUser: imageUrl || "../../../../assets/noImageUser.png",
    });
  };

  const handleShow = () => {
    if (onClick) onClick();
    setShowLogin(true);
  }

  const handleClose = () => {
    setShowLogin(false);
    setDataUser({
      name: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      repeatPassword: "",
    })
  }
 
  useEffect(() => {
    setDataUser({
      name: userInfoCurrentStorage.name || "",
      lastName: userInfoCurrentStorage.lastName || "",
      email: userInfoCurrentStorage.email || "",
      phone: userInfoCurrentStorage.phone || "",
      password: userInfoCurrentStorage.password || "",
      repeatPassword: userInfoCurrentStorage.repeatPassword || "",
      imageUser:
        userInfoCurrentStorage.imageUser ||
        "../../../../assets/noImageUser.png",
    });
  }, [userInfoCurrentStorage]);

  return (
    <>
      <Button onClick={handleShow}>Open modal</Button>
      <Modal
        open={(open,showLogin)}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className='create-company'>
          <div className="info-personal">
            <h3 className="title-info-personal">
              Crear perfil de empresa 
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
                    name="password"
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
                    <FileUploadIcon sx={{ width: "50%", height: "100%",cursor: 'pointer' }} />
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
              <ButtonBack
                className="back-button"
                textButton={"Cancelar"}
                handleFunction={handleClose}
              />
              <ButtonNext
                className="next-button"
                textButton={"Continuar"}
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
        </div>
      </Modal>
  </>
  )
}
export default CreateCompany