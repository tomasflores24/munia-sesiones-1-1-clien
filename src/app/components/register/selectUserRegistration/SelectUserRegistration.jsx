import { useDispatch, useSelector } from "react-redux";
// import {
//   nextStep,
//   saveTypeUser,
// } from "../../../redux/slices/registrationSlice/registrationSlice";
import "./SelectUserRegistration.scss";
import Button from "../../Common/Button/Button";
import ButtonNext from "../../Common/Button/ButtonNext";

const SelectUserRegistration = () => {
  const dispatch = useDispatch();
  const handleNext = () => {
    dispatch(nextStep());
  };
  const handleSaveTypeUser = (e) => {
    const { name } = e.target;
    dispatch(saveTypeUser(name));
  };
  const typeUser = useSelector(state=>state.registration.typeUser)
  return (
    <div className="select-user-container">
      <section className="select-user-title">Registro</section>
      <h3 className="select-user-subtitle">Selecciona tu tipo de usuario.</h3>
      <section className="select-user-buttonsUser">
        <Button
          textButton="Usuario"
          name="user"
          className={`select-user-button-user ${
            typeUser === "user" ? "selected" : ""
          }`}
          handleFunction={handleSaveTypeUser}
        />
        <Button
          name="psicologo"
          textButton="Psicólogo"
          className={`select-user-button-psicologo ${
            typeUser === "psicologo" ? "selected" : ""
          }`}
          handleFunction={handleSaveTypeUser}
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
