import AgendaSelectCategory from "./AgendaSelectCategory";
import CardsProfesionals from "./CardsProfesionals";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
const ModalAgendar = ({ handleModal }) => {
  return (
    <div className="window">
      <CloseIcon className="closeIcon" onClick={() => handleModal(false)} />
      <h2 className="title ">Agendar tu cita</h2>
      <div className="window__container2">
        <p className="window__paragraph subtitle consulta__subtitle">
          Sesiones restantes
        </p>
        <section className="window__body">
          <div className="calendar"></div>
          <AgendaSelectCategory />
          <div className="window__consulta">
            <label htmlFor="consulta" className="consulta__label ">
              Razón de la consulta
            </label>
            <textarea className="consulta__input" />
          </div>
        </section>
        <h2 className="subtitle consulta__subtitle">
          Profesional seleccionado
        </h2>
      </div>
      <CardsProfesionals />
      <button onClick={handleModal} className="window__btn">
        Confirmar
      </button>
    </div>
  );
};

export default ModalAgendar;
