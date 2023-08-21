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
    setDataUser({ ...dataUser, imageUser: imageUrl||"../../../../assets/noImageUser.png" });
  };

  useEffect(() => {
    setIsFormComplete(checkFormCompletion());
  }, [dataUser]);

  useEffect(() => {
    setDataUser({
      name: userInfoCurrentStorage.name || "",
      lastName: userInfoCurrentStorage.lastName || "",
      email: userInfoCurrentStorage.email || "",
      phone: userInfoCurrentStorage.phone || "",
      password: userInfoCurrentStorage.password || "",
      repeatPassword: userInfoCurrentStorage.repeatPassword || "",
      imageUser: userInfoCurrentStorage.imageUser || "../../../../assets/noImageUser.png",
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
