import useCreateCardsDocumentation from "../../../hooks/Register/useCreateCardsDocumentation";
import ButtonNext from "../../Button/ButtonNext";
import ButtonBack from "../../Button/ButtonBack";
import "./Documentation.scss";
import { backStep, nextStep } from "../../../redux/slices/registrationSlice/registrationSlice";
import { useDispatch } from "react-redux";
const Documentation = () => {
  const dispatch = useDispatch();

  const titlesDocumentationCards = [
    { title: "Antecedentes Penales" },
    { title: "Diploma de Grado" },
    { title: "Tarjeta Profesional" },
    { title: "Portfolio de Servicios" },
  ];
  const { DocumentationCards } = useCreateCardsDocumentation(
    titlesDocumentationCards
  );
  const handleNext= ()=>{
    dispatch(nextStep())

  }
  const handleBack= ()=>{
    dispatch(backStep())

  }
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
        <ButtonNext textButton={"Siguiente"} handleFunction={handleNext}/>
      </section>
    </div>
  );
};

export default Documentation;
