import useCreateCardsDocumentation from "../../../hooks/Register/useCreateCardsDocumentation";
import ButtonNext from "../../Button/ButtonNext";
import ButtonBack from "../../Button/ButtonBack";
import "./Documentation.scss";
import {
  backStep,
  nextStep,
  saveDocumentationUser,
} from "../../../redux/slices/registrationSlice/registrationSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
const Documentation = () => {
  const dispatch = useDispatch();
  const [documentationUser, setDocumentationUser] = useState({});

  const titlesDocumentationCards = [
    { title: "Antecedentes Penales" },
    { title: "Diploma de Grado" },
    { title: "Tarjeta Profesional" },
    { title: "Portfolio de Servicios" },
  ];
  //Avanzo siguiente ventana, y guardo la informacion
  const handleNext = () => {
    dispatch(saveDocumentationUser(documentationUser));
    dispatch(nextStep());
  };
  const handleBack = () => {
    dispatch(backStep());
  };
  //Obtengo documentos {} subidos por el usuario
  const getDocument = (documentationUser) => {
    setDocumentationUser(documentationUser);
  };
  //Customhooks para generacion de las cards para subir documentos
  const { DocumentationCards } = useCreateCardsDocumentation(
    titlesDocumentationCards,
    getDocument
  );
 
  return (
    <div className="documentation-container">
      <h2 className="title">
        Ahora, enfoquémonos en la documentación profesional.
      </h2>
      <section className="documentation-cards">
        <DocumentationCards />
      </section>
      <section className="buttons">
        <ButtonBack textButton={"Atras"} handleFunction={handleBack} />
        <ButtonNext textButton={"Siguiente"} handleFunction={handleNext} />
      </section>
    </div>
  );
};

export default Documentation;
