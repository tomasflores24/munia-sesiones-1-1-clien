import ButtonBack from "../../Common/Button/ButtonBack";
import ButtonNext from "../../Common/Button/ButtonNext";
import "./DocumentationPresentation.scss";
import PropTypes from "prop-types";

const DocumentationPresentation = ({
  handleBack,
  DocumentationCards,
  handleNext,
}) => {
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
DocumentationPresentation.propTypes = {
  handleBack: PropTypes.func.isRequired,
  DocumentationCards: PropTypes.elementType.isRequired,
  handleNext: PropTypes.func.isRequired,
};
export default DocumentationPresentation;
