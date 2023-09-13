import { useEffect, useState } from "react";
import {
  nextStep,
  savePersonalInfo,
} from "../../../redux/slices/registrationSlice/registrationSlice";
import { useDispatch, useSelector } from "react-redux";
import PersonalInfoPresentation from "./PersonalInfoPresentation";

const PersonalInfoTab = () => {
  const dispatch = useDispatch();
  const userInfoCurrentStorage = useSelector(
    (state) => state.registration.dataUser
  );
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
    // Validación de correo electrónico
    const isValid = validateEmail(dataUser.email);
    setIsValidEmail(isValid);
  
    // Verificación del formulario completado
    const isFormCompleteValue = checkFormCompletion();
    setIsFormComplete(isFormCompleteValue);
  
    // Si el correo es válido y el formulario está completo, procede
    if (isValid && isFormCompleteValue === "completo") {
      // Despachar acciones y restablecer datos del usuario
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
    <PersonalInfoPresentation
      dataUser={dataUser}
      isValidEmail={isValidEmail}
      isFormComplete={isFormComplete}
      handleInputChange={handleInputChange}
      handleImageUpload={handleImageUpload}
      handleSubmit={handleSubmit}
    />
  );
};

export default PersonalInfoTab;
