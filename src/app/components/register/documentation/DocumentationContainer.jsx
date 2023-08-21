import useCreateCardsDocumentation from "../../../hooks/Register/useCreateCardsDocumentation";

import "./DocumentationPresentation";
import {
  backStep,
  nextStep,
  saveDocumentationUser,
} from "../../../redux/slices/registrationSlice/registrationSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import DocumentationPresentation from "./DocumentationPresentation";
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
   <DocumentationPresentation handleBack={handleBack} DocumentationCards={DocumentationCards} handleNext={handleNext}/>
  );
};

export default Documentation;
