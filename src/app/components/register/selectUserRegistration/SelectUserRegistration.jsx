import { useDispatch } from "react-redux";
import { nextStep } from "../../../redux/slices/registrationSlice/registrationSlice";
import Button from "../../Button/Button";
import ButtonNext from "../../Button/ButtonNext";
import "./SelectUserRegistration.scss";
const SelectUserRegistration = () => {
  const dispatch = useDispatch();
  const handleNext = () => {
    dispatch(nextStep());
  };
  return (
    <div className="select-user-container">
      <section className="select-user-title">Registro</section>
      <h3 className="select-user-subtitle">Selecciona tu tipo de usuario.</h3>
      <section className="select-user-buttonsUser">
        <Button textButton="Usuario" className={"select-user-button-user"} />
        <Button
          textButton="Psicólogo"
          className={"select-user-button-psicologo"}
        />
      </section>
      <section className="select-user-final">
        <h5 className="select-user-finalTitle">
          Nuestra mision es tu
          <label className="select-user-label-bienestar">bienestar</label>
        </h5>
      </section>
      <section className="select-user-button-next-container">
        <ButtonNext
          className={"select-user-button-next"}
          textButton="Siguiente"
          handleFunction={handleNext}
        />
      </section>
    </div>
  );
};

export default SelectUserRegistration;
