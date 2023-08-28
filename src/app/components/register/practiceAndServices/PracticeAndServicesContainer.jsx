import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  backStep,
  registrationUser,
  saveProfession,
} from "../../../redux/slices/registrationSlice/registrationSlice";
import PracticeAndServicesPresentation from "./PracticeAndServicesPresentation";
import PropTypes from "prop-types";

const PracticeAndServices = ({ setRegisterSuccess }) => {
  //Opcion seleccionada (profesiones seleccionadas)
  const [selectedOption, setSelectedOption] = useState("");
  //Opciones seleccionadas (profesiones seleccionadas)
  const [selectedOptions, setSelectedOptions] = useState([]);
  //Guardamos en true si acepto los terminos de uso, false caso contrario.
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  //mostrar alerta no acepto terminos
  const [showAlert, setShowAlert] = useState(false);
  //registro exitoso
  //Funcion dispatch de acciones redux
  const dispatch = useDispatch();
  //Profesiones que asisten al paciente, deberia llegar por backend-----------
  const options = [
    "Consulta médica",
    "Dentista",
    "Psicólogo",
    "Nutricionista",
    "Terapeuta físico",
  ];
  const selectedOptionsStorage = useSelector(
    (state) => state.registration.professions
  );

  //Ante cada seleccion, guardamos la profesion temporalmente en selectedOption
  // Ante cada selección, guardamos la profesión temporalmente en selectedOption
  const handleOptionChange = (event) => {
    const selected = event.target.value;
    if (selected && !selectedOptions.includes(selected)) {
      // Agregamos la profesión seleccionada automáticamente
      setSelectedOptions([...selectedOptions, selected]);
    }
    setSelectedOption(""); // Reiniciamos la opción seleccionada
  };

  //Verificamos que la profesion no haya sido elegida, para evitar duplicados y la agregamos
  const handleAddOption = () => {
    if (selectedOption && !selectedOptions.includes(selectedOption)) {
      //Guardamos la profesion seleccionada, ya que no se encuentra en las profesiones anteriores seleccionadas
      setSelectedOptions([...selectedOptions, selectedOption]);

      //Seteamos a vacio al estado que almacena temporalmente la profesion
      setSelectedOption("");
    }
  };
  //Funcion eliminar una opcion (profesion)
  const handleRemoveOption = (option) => {
    setSelectedOptions(selectedOptions.filter((item) => item !== option));
  };
  //Funcion volver pestaña anterior
  const handleBack = () => {
    dispatch(backStep());
  };
  //Se realiza registro, guardamos toda la informacion de cada pestaña y la enviamos al backend
  const handleSubmitRegistration = () => {
    if (acceptedTerms) {
      setShowAlert(false);
      dispatch(saveProfession(selectedOptions));
      setRegisterSuccess(true);
      dispatch(registrationUser());
    } else {
      setShowAlert(true);
    }
  };
  //Funcion que se ejecuta cuando aceptamos los terminos de uso!
  const handleTermsCheck = () => {
    setAcceptedTerms(!acceptedTerms);
  };
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  // Establece las opciones seleccionadas anteriormente al montar el componente
  useEffect(() => {
    setSelectedOptions(selectedOptionsStorage);
  }, [selectedOptionsStorage]);
  return (
    <PracticeAndServicesPresentation
      selectedOption={selectedOption}
      selectedOptions={selectedOptions}
      acceptedTerms={acceptedTerms}
      handleOptionChange={handleOptionChange}
      handleAddOption={handleAddOption}
      handleRemoveOption={handleRemoveOption}
      handleBack={handleBack}
      handleSubmitRegistration={handleSubmitRegistration}
      handleTermsCheck={handleTermsCheck}
      options={options}
      showAlert={showAlert}
      handleCloseAlert={handleCloseAlert}
      setRegisterSuccess={setRegisterSuccess}
    />
  );
};
PracticeAndServices.propTypes = {
  setRegisterSuccess: PropTypes.func.isRequired,
};
export default PracticeAndServices;
